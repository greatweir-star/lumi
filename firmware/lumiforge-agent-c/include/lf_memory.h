#ifndef LF_MEMORY_H
#define LF_MEMORY_H

#include "lf_types.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef lf_status_t (*lf_memory_read_t)(const char *path, lf_text_t *out_text, void *user_data);
typedef lf_status_t (*lf_memory_write_t)(const char *path, const char *content, void *user_data);

typedef struct {
  const char *memory_path;
  const char *user_path;
  const char *soul_path;
  const char *identity_path;
  lf_memory_read_t read;
  lf_memory_write_t write;
  void *user_data;
} lf_memory_store_t;

lf_status_t lf_memory_read_file(lf_memory_store_t *store, const char *path, lf_text_t *out_text);
lf_status_t lf_memory_write_file(lf_memory_store_t *store, const char *path, const char *content);
lf_status_t lf_memory_append_line(lf_memory_store_t *store, const char *path, const char *line);

#ifdef __cplusplus
}
#endif

#endif
