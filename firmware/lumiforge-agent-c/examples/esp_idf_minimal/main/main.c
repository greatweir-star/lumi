#include "lf_agent.h"
#include "lf_platform_espidf.h"
#include "lf_platform_stdio.h"
#include <stdio.h>
#include <string.h>

#if defined(ESP_PLATFORM)
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#endif

static const char *TAG = "LumiForgeApp";

static lf_status_t demo_llm(const char *prompt, lf_text_t *out_text, void *user_data) {
  (void)user_data;
  if (!prompt || !out_text) return LF_ERR_INVALID_ARG;
  (void)snprintf(out_text->data, sizeof(out_text->data), "[edge-agent] runtime ready");
  out_text->len = strlen(out_text->data);
  return LF_OK;
}

static lf_status_t demo_output(const char *channel, const char *content, void *user_data) {
  (void)user_data;
#if defined(ESP_PLATFORM)
  ESP_LOGI(TAG, "output[%s]: %s", channel ? channel : "local", content ? content : "");
#else
  printf("output[%s]: %s\n", channel ? channel : "local", content ? content : "");
#endif
  return LF_OK;
}

void app_main(void) {
  lf_platform_t platform;
  lf_espidf_platform_config_t platform_config = { .tag = "LumiForge", .storage_root = "/fatfs" };
  (void)lf_espidf_platform_create(&platform_config, &platform);
  (void)lf_platform_log(&platform, "info", "LumiForge Agent C ESP-IDF minimal app starting");

  lf_agent_context_t agent;
  lf_agent_config_t agent_config = {
    .agent_id = "lumiforge-espidf-minimal",
    .persona = "LumiForge lightweight edge agent",
    .llm_complete = demo_llm,
    .output = demo_output,
    .llm_user_data = 0,
    .output_user_data = 0
  };

  if (lf_agent_init(&agent, &agent_config) != LF_OK) {
    (void)lf_platform_log(&platform, "error", "agent init failed");
    return;
  }

  lf_memory_store_t memory = {
    .memory_path = "MEMORY.md",
    .user_path = "USER.md",
    .soul_path = "SOUL.md",
    .identity_path = "IDENTITY.md",
    .read = lf_espidf_storage_read,
    .write = lf_espidf_storage_write,
    .user_data = platform.user_data
  };
  lf_agent_attach_memory(&agent, &memory);

  lf_capability_t system_cap = { .id = "cap_system", .name = "System", .kind = LF_CAP_SYSTEM, .enabled = true };
  lf_capability_t memory_cap = { .id = "cap_memory", .name = "Memory", .kind = LF_CAP_MEMORY, .enabled = true };
  lf_capability_t scheduler_cap = { .id = "cap_scheduler", .name = "Scheduler", .kind = LF_CAP_SCHEDULER, .enabled = true };
  (void)lf_agent_register_capability(&agent, &system_cap);
  (void)lf_agent_register_capability(&agent, &memory_cap);
  (void)lf_agent_register_capability(&agent, &scheduler_cap);

  lf_tool_t heap_tool = lf_builtin_tool_heap_info();
  lf_tool_t memory_tool = lf_builtin_tool_memory_write();
  lf_tool_t time_tool = lf_builtin_tool_time();
  (void)lf_agent_register_tool(&agent, &heap_tool);
  (void)lf_agent_register_tool(&agent, &memory_tool);
  (void)lf_agent_register_tool(&agent, &time_tool);

  (void)lf_agent_submit_text(&agent, "boot", "boot self check");
  while (!lf_event_queue_is_empty(&agent.events)) {
    (void)lf_agent_step(&agent);
  }

#if defined(ESP_PLATFORM)
  for (;;) {
    vTaskDelay(pdMS_TO_TICKS(1000));
  }
#endif
}
