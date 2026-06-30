#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "lf_agent.h"
#include "lf_memory.h"
#include "lf_platform_espidf.h"
#include <stdio.h>
#include <string.h>

static const char *TAG = "lumi_agent_demo";

static lf_status_t demo_llm_complete(const char *prompt, lf_text_t *out_text, void *user_data) {
  (void)user_data;
  if (!out_text) return LF_ERR_INVALID_ARG;
  ESP_LOGI(TAG, "LLM prompt preview:\n%s", prompt ? prompt : "");
  (void)snprintf(out_text->data, sizeof(out_text->data), "%s", "LumiForge ESP-IDF Agent demo received your event.");
  out_text->len = strlen(out_text->data);
  return LF_OK;
}

static lf_status_t demo_output(const char *channel, const char *content, void *user_data) {
  (void)user_data;
  ESP_LOGI(TAG, "agent output channel=%s content=%s", channel ? channel : "local", content ? content : "");
  return LF_OK;
}

void app_main(void) {
  ESP_LOGI(TAG, "LumiForge ESP-IDF Agent demo starting");

  lf_platform_t platform;
  lf_espidf_platform_config_t platform_config = {
    .tag = TAG,
    .storage_root = "/fatfs"
  };
  lf_status_t status = lf_espidf_platform_create(&platform_config, &platform);
  if (status != LF_OK) {
    ESP_LOGE(TAG, "failed to create ESP-IDF platform adapter: %d", (int)status);
    return;
  }

  lf_memory_store_t memory = {
    .memory_path = "/fatfs/memory/MEMORY.md",
    .user_path = "/fatfs/memory/user.md",
    .soul_path = "/fatfs/memory/soul.md",
    .identity_path = "/fatfs/memory/identity.md",
    .read = lf_espidf_storage_read,
    .write = lf_espidf_storage_write,
    .user_data = &platform
  };

  lf_agent_config_t config = {
    .agent_id = "lumiforge-esp32s3-demo",
    .persona = "You are a LumiForge AI Native hardware agent running on ESP32-S3.",
    .llm_complete = demo_llm_complete,
    .output = demo_output,
    .llm_user_data = NULL,
    .output_user_data = NULL
  };

  lf_agent_context_t agent;
  status = lf_agent_init(&agent, &config);
  if (status != LF_OK) {
    ESP_LOGE(TAG, "failed to initialize agent: %d", (int)status);
    return;
  }
  lf_agent_attach_memory(&agent, &memory);

  status = lf_agent_submit_text(&agent, "boot", "hello from ESP-IDF app_main");
  if (status != LF_OK) {
    ESP_LOGE(TAG, "failed to submit text event: %d", (int)status);
    return;
  }

  status = lf_agent_step(&agent);
  ESP_LOGI(TAG, "agent step status=%d", (int)status);

  while (true) {
    vTaskDelay(pdMS_TO_TICKS(5000));
    ESP_LOGI(TAG, "LumiForge ESP-IDF Agent demo heartbeat");
  }
}
