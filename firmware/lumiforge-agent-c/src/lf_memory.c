#include "lf_memory.h"
#include <stdio.h>
#include <string.h>

lf_status_t lf_memory_read_file(lf_memory_store_t *store, const char *path, lf_text_t *out_text) {
  if (!store || !path || !out_text || !store->read) return LF_ERR_INVALID_ARG;
  return store->read(path, out_text, store->user_data);
}

lf_status_t lf_memory_write_file(lf_memory_store_t *store, const char *path, const char *content) {
  if (!store || !path || !content || !store->write) return LF_ERR_INVALID_ARG;
  return store->write(path, content, store->user_data);
}

lf_status_t lf_memory_append_line(lf_memory_store_t *store, const char *path, const char *line) {
  if (!store || !path || !line) return LF_ERR_INVALID_ARG;
  lf_text_t existing = lf_text_empty();
  lf_status_t read_status = lf_memory_read_file(store, path, &existing);
  if (read_status != LF_OK && read_status != LF_ERR_NOT_FOUND) return read_status;

  char merged[LF_MAX_TEXT];
  if (read_status == LF_OK && existing.len > 0U) {
    (void)snprintf(merged, sizeof(merged), "%s\n%s", existing.data, line);
  } else {
    (void)snprintf(merged, sizeof(merged), "%s", line);
  }
  return lf_memory_write_file(store, path, merged);
}
