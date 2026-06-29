#include "lf_agent.h"
#include <stdio.h>
#include <string.h>

static void lf_copy_text(lf_text_t *target, const char *source) {
  if (!target) return;
  if (!source) source = "";
  (void)snprintf(target->data, sizeof(target->data), "%s", source);
  target->len = strlen(target->data);
}

lf_status_t lf_agent_init(lf_agent_context_t *agent, const lf_agent_config_t *config) {
  if (!agent || !config || !config->agent_id) return LF_ERR_INVALID_ARG;
  memset(agent, 0, sizeof(*agent));
  agent->config = *config;
  lf_event_queue_init(&agent->events);
  lf_capability_registry_init(&agent->capabilities);
  lf_tool_registry_init(&agent->tools);
  agent->scratch = lf_text_empty();
  return LF_OK;
}

void lf_agent_attach_memory(lf_agent_context_t *agent, const lf_memory_store_t *memory) {
  if (!agent || !memory) return;
  agent->memory = *memory;
}

lf_status_t lf_agent_register_capability(lf_agent_context_t *agent, const lf_capability_t *capability) {
  if (!agent) return LF_ERR_INVALID_ARG;
  return lf_capability_register(&agent->capabilities, capability);
}

lf_status_t lf_agent_register_tool(lf_agent_context_t *agent, const lf_tool_t *tool) {
  if (!agent) return LF_ERR_INVALID_ARG;
  return lf_tool_register(&agent->tools, tool);
}

lf_status_t lf_agent_emit(lf_agent_context_t *agent, const lf_event_t *event) {
  if (!agent) return LF_ERR_INVALID_ARG;
  return lf_event_push(&agent->events, event);
}

lf_status_t lf_agent_submit_text(lf_agent_context_t *agent, const char *source, const char *text) {
  if (!agent || !text) return LF_ERR_INVALID_ARG;
  lf_event_t event;
  memset(&event, 0, sizeof(event));
  event.type = LF_EVENT_TEXT;
  (void)snprintf(event.source, sizeof(event.source), "%s", source ? source : "local");
  lf_copy_text(&event.payload, text);
  return lf_agent_emit(agent, &event);
}

lf_status_t lf_agent_call_tool(lf_agent_context_t *agent, const char *tool_id, const char *input, lf_text_t *output) {
  if (!agent) return LF_ERR_INVALID_ARG;
  return lf_tool_call(&agent->tools, agent, tool_id, input, output);
}

static lf_status_t lf_agent_build_prompt(lf_agent_context_t *agent, const lf_event_t *event, lf_text_t *prompt) {
  if (!agent || !event || !prompt) return LF_ERR_INVALID_ARG;
  (void)snprintf(
    prompt->data,
    sizeof(prompt->data),
    "agent=%s\npersona=%s\nsource=%s\nevent=%d\ninput=%s\n",
    agent->config.agent_id,
    agent->config.persona ? agent->config.persona : "",
    event->source,
    (int)event->type,
    event->payload.data
  );
  prompt->len = strlen(prompt->data);
  return LF_OK;
}

lf_status_t lf_agent_step(lf_agent_context_t *agent) {
  if (!agent) return LF_ERR_INVALID_ARG;
  lf_event_t event;
  lf_status_t status = lf_event_pop(&agent->events, &event);
  if (status != LF_OK) return status;

  lf_text_t prompt = lf_text_empty();
  lf_text_t reply = lf_text_empty();
  status = lf_agent_build_prompt(agent, &event, &prompt);
  if (status != LF_OK) return status;

  if (agent->memory.write && agent->memory.memory_path) {
    (void)lf_memory_append_line(&agent->memory, agent->memory.memory_path, event.payload.data);
  }

  if (agent->config.llm_complete) {
    status = agent->config.llm_complete(prompt.data, &reply, agent->config.llm_user_data);
  } else {
    lf_copy_text(&reply, "LumiForge agent received the event.");
    status = LF_OK;
  }

  if (status == LF_OK && agent->config.output) {
    return agent->config.output(event.source, reply.data, agent->config.output_user_data);
  }
  return status;
}
