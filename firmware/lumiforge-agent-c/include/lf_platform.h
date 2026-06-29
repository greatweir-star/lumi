#ifndef LF_PLATFORM_H
#define LF_PLATFORM_H

#include "lf_types.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef lf_status_t (*lf_platform_log_t)(const char *level, const char *message, void *user_data);
typedef uint64_t (*lf_platform_millis_t)(void *user_data);
typedef lf_status_t (*lf_platform_read_file_t)(const char *path, lf_text_t *out_text, void *user_data);
typedef lf_status_t (*lf_platform_write_file_t)(const char *path, const char *content, void *user_data);
typedef lf_status_t (*lf_platform_transport_send_t)(const char *channel, const char *payload, void *user_data);

typedef struct {
  lf_platform_log_t log;
  lf_platform_millis_t millis;
  lf_platform_read_file_t read_file;
  lf_platform_write_file_t write_file;
  lf_platform_transport_send_t transport_send;
  void *user_data;
} lf_platform_t;

lf_status_t lf_platform_log(lf_platform_t *platform, const char *level, const char *message);
uint64_t lf_platform_millis(lf_platform_t *platform);
lf_status_t lf_platform_read_file(lf_platform_t *platform, const char *path, lf_text_t *out_text);
lf_status_t lf_platform_write_file(lf_platform_t *platform, const char *path, const char *content);
lf_status_t lf_platform_transport_send(lf_platform_t *platform, const char *channel, const char *payload);

#ifdef __cplusplus
}
#endif

#endif
