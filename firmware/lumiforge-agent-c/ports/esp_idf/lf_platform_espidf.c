#include "lf_platform_espidf.h"

#include <stdio.h>
#include <string.h>

#if defined(ESP_PLATFORM)
#include "esp_log.h"
#include "esp_timer.h"
#endif

typedef struct {
  const char *tag;
  const char *storage_root;
} lf_espidf_state_t;

static lf_espidf_state_t g_lf_espidf_state;

static lf_status_t lf_espidf_log(const char *level, const char *message, void *user_data) {
  lf_espidf_state_t *state = (lf_espidf_state_t *)user_data;
  const char *tag = state && state->tag ? state->tag : "LumiForge";
#if defined(ESP_PLATFORM)
  if (level && strcmp(level, "error") == 0) {
    ESP_LOGE(tag, "%s", message ? message : "");
  } else if (level && strcmp(level, "warn") == 0) {
    ESP_LOGW(tag, "%s", message ? message : "");
  } else {
    ESP_LOGI(tag, "%s", message ? message : "");
  }
#else
  printf("[%s][%s] %s\n", tag, level ? level : "info", message ? message : "");
#endif
  return LF_OK;
}

static uint64_t lf_espidf_millis(void *user_data) {
  (void)user_data;
#if defined(ESP_PLATFORM)
  return (uint64_t)(esp_timer_get_time() / 1000ULL);
#else
  return 0U;
#endif
}

static void lf_join_path(char *out, size_t out_size, const char *root, const char *path) {
  if (!out || out_size == 0U) return;
  if (!root) root = "";
  if (!path) path = "";
  if (path[0] == '/') {
    (void)snprintf(out, out_size, "%s", path);
  } else {
    (void)snprintf(out, out_size, "%s/%s", root, path);
  }
}

lf_status_t lf_espidf_storage_read(const char *path, lf_text_t *out_text, void *user_data) {
  lf_espidf_state_t *state = (lf_espidf_state_t *)user_data;
  if (!path || !out_text) return LF_ERR_INVALID_ARG;
  char full_path[160];
  lf_join_path(full_path, sizeof(full_path), state ? state->storage_root : "/fatfs", path);
  FILE *file = fopen(full_path, "r");
  if (!file) return LF_ERR_NOT_FOUND;
  size_t read = fread(out_text->data, 1, sizeof(out_text->data) - 1U, file);
  out_text->data[read] = '\0';
  out_text->len = read;
  fclose(file);
  return LF_OK;
}

lf_status_t lf_espidf_storage_write(const char *path, const char *content, void *user_data) {
  lf_espidf_state_t *state = (lf_espidf_state_t *)user_data;
  if (!path || !content) return LF_ERR_INVALID_ARG;
  char full_path[160];
  lf_join_path(full_path, sizeof(full_path), state ? state->storage_root : "/fatfs", path);
  FILE *file = fopen(full_path, "w");
  if (!file) return LF_ERR_PLATFORM;
  fputs(content, file);
  fclose(file);
  return LF_OK;
}

lf_status_t lf_espidf_transport_send(const char *channel, const char *payload, void *user_data) {
  (void)user_data;
#if defined(ESP_PLATFORM)
  ESP_LOGI("LumiForge", "transport[%s]: %s", channel ? channel : "local", payload ? payload : "");
#else
  printf("transport[%s]: %s\n", channel ? channel : "local", payload ? payload : "");
#endif
  return LF_OK;
}

lf_status_t lf_espidf_platform_create(
  const lf_espidf_platform_config_t *config,
  lf_platform_t *out_platform
) {
  if (!out_platform) return LF_ERR_INVALID_ARG;
  g_lf_espidf_state.tag = config && config->tag ? config->tag : "LumiForge";
  g_lf_espidf_state.storage_root = config && config->storage_root ? config->storage_root : "/fatfs";
  out_platform->log = lf_espidf_log;
  out_platform->millis = lf_espidf_millis;
  out_platform->read_file = lf_espidf_storage_read;
  out_platform->write_file = lf_espidf_storage_write;
  out_platform->transport_send = lf_espidf_transport_send;
  out_platform->user_data = &g_lf_espidf_state;
  return LF_OK;
}
