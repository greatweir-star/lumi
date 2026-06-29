#ifndef LF_AGENT_H
#define LF_AGENT_H

#include "lf_capability.h"
#include "lf_event.h"
#include "lf_memory.h"
#include "lf_tool.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef lf_status_t (*lf_llm_complete_t)(
  const char *prompt,
  lf_text_t *out_text,
  void *user_data
);

typedef lf_status_t (*lf_agent_output_t)(
  const char *channel,
  const char *content,
  void *user_data
);

typedef struct {
  const char *agent_id;
  const char *persona;
  lf_llm_complete_t llm_complete;
  lf_agent_output_t output;
  void *llm_user_data;
  void *output_user_data;
} lf_agent_config_t;

typedef struct lf_agent_context {
  lf_agent_config_t config;
  lf_event_queue_t events;
  lf_capability_registry_t capabilities;
  lf_tool_registry_t tools;
  lf_memory_store_t memory;
  lf_text_t scratch;
} lf_agent_context_t;

lf_status_t lf_agent_init(lf_agent_context_t *agent, const lf_agent_config_t *config);
void lf_agent_attach_memory(lf_agent_context_t *agent, const lf_memory_store_t *memory);
lf_status_t lf_agent_register_capability(lf_agent_context_t *agent, const lf_capability_t *capability);
lf_status_t lf_agent_register_tool(lf_agent_context_t *agent, const lf_tool_t *tool);
lf_status_t lf_agent_emit(lf_agent_context_t *agent, const lf_event_t *event);
lf_status_t lf_agent_step(lf_agent_context_t *agent);
lf_status_t lf_agent_submit_text(lf_agent_context_t *agent, const char *source, const char *text);
lf_status_t lf_agent_call_tool(lf_agent_context_t *agent, const char *tool_id, const char *input, lf_text_t *output);

#ifdef __cplusplus
}
#endif

#endif
