#include "lf_platform.h"

lf_status_t lf_platform_log(lf_platform_t *platform, const char *level, const char *message) {
  if (!platform || !platform->log) return LF_ERR_INVALID_ARG;
  return platform->log(level, message, platform->user_data);
}

uint64_t lf_platform_millis(lf_platform_t *platform) {
  if (!platform || !platform->millis) return 0U;
  return platform->millis(platform->user_data);
}

lf_status_t lf_platform_read_file(lf_platform_t *platform, const char *path, lf_text_t *out_text) {
  if (!platform || !platform->read_file) return LF_ERR_INVALID_ARG;
  return platform->read_file(path, out_text, platform->user_data);
}

lf_status_t lf_platform_write_file(lf_platform_t *platform, const char *path, const char *content) {
  if (!platform || !platform->write_file) return LF_ERR_INVALID_ARG;
  return platform->write_file(path, content, platform->user_data);
}

lf_status_t lf_platform_transport_send(lf_platform_t *platform, const char *channel, const char *payload) {
  if (!platform || !platform->transport_send) return LF_ERR_INVALID_ARG;
  return platform->transport_send(channel, payload, platform->user_data);
}
