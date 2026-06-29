#ifndef LF_TYPES_H
#define LF_TYPES_H

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

#ifndef LF_MAX_EVENT_QUEUE
#define LF_MAX_EVENT_QUEUE 16
#endif

#ifndef LF_MAX_CAPABILITIES
#define LF_MAX_CAPABILITIES 32
#endif

#ifndef LF_MAX_TOOLS
#define LF_MAX_TOOLS 24
#endif

#ifndef LF_MAX_TEXT
#define LF_MAX_TEXT 512
#endif

#ifndef LF_MAX_ID
#define LF_MAX_ID 48
#endif

typedef enum {
  LF_OK = 0,
  LF_ERR_INVALID_ARG = -1,
  LF_ERR_FULL = -2,
  LF_ERR_NOT_FOUND = -3,
  LF_ERR_PLATFORM = -4,
  LF_ERR_TOOL = -5
} lf_status_t;

typedef struct {
  char data[LF_MAX_TEXT];
  size_t len;
} lf_text_t;

static inline lf_text_t lf_text_empty(void) {
  lf_text_t text;
  text.data[0] = '\0';
  text.len = 0;
  return text;
}

#ifdef __cplusplus
}
#endif

#endif
