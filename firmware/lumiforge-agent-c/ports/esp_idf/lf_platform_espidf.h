#ifndef LF_PLATFORM_ESPIDF_H
#define LF_PLATFORM_ESPIDF_H

#include "lf_platform.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
  const char *tag;
  const char *storage_root;
} lf_espidf_platform_config_t;

lf_status_t lf_espidf_platform_create(
  const lf_espidf_platform_config_t *config,
  lf_platform_t *out_platform
);

lf_status_t lf_espidf_storage_read(const char *path, lf_text_t *out_text, void *user_data);
lf_status_t lf_espidf_storage_write(const char *path, const char *content, void *user_data);
lf_status_t lf_espidf_transport_send(const char *channel, const char *payload, void *user_data);

#ifdef __cplusplus
}
#endif

#endif
