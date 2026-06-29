#include "lf_platform_stdio.h"
#include <stdio.h>

int main(void) {
  lf_agent_context_t agent;
  lf_agent_config_t config = {
    .agent_id = "lumiforge-host-demo",
    .persona = "你是运行在智能硬件上的 LumiForge 轻量级 Agent。",
    .llm_complete = lf_stdio_llm_echo,
    .output = lf_stdio_output,
    .llm_user_data = 0,
    .output_user_data = 0
  };

  lf_status_t status = lf_agent_init(&agent, &config);
  if (status != LF_OK) return 1;

  lf_memory_store_t memory = {
    .memory_path = "MEMORY.md",
    .user_path = "USER.md",
    .soul_path = "SOUL.md",
    .identity_path = "IDENTITY.md",
    .read = lf_stdio_memory_read,
    .write = lf_stdio_memory_write,
    .user_data = 0
  };
  lf_agent_attach_memory(&agent, &memory);

  lf_capability_t system_cap = { .id = "cap_system", .name = "System", .kind = LF_CAP_SYSTEM, .enabled = true };
  lf_capability_t memory_cap = { .id = "cap_memory", .name = "Memory", .kind = LF_CAP_MEMORY, .enabled = true };
  lf_capability_t scheduler_cap = { .id = "cap_scheduler", .name = "Scheduler", .kind = LF_CAP_SCHEDULER, .enabled = true };
  lf_agent_register_capability(&agent, &system_cap);
  lf_agent_register_capability(&agent, &memory_cap);
  lf_agent_register_capability(&agent, &scheduler_cap);

  lf_tool_t heap_tool = lf_builtin_tool_heap_info();
  lf_tool_t memory_tool = lf_builtin_tool_memory_write();
  lf_tool_t time_tool = lf_builtin_tool_time();
  lf_agent_register_tool(&agent, &heap_tool);
  lf_agent_register_tool(&agent, &memory_tool);
  lf_agent_register_tool(&agent, &time_tool);

  printf("LumiForge Agent C host demo started.\n");
  lf_agent_submit_text(&agent, "local", "你好，请记录我喜欢智能硬件。然后告诉我当前状态。");
  while (!lf_event_queue_is_empty(&agent.events)) {
    lf_agent_step(&agent);
  }

  lf_text_t tool_output = lf_text_empty();
  lf_agent_call_tool(&agent, "get_current_time", "", &tool_output);
  printf("tool:get_current_time => %s\n", tool_output.data);
  return 0;
}
