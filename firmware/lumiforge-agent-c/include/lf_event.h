#ifndef LF_EVENT_H
#define LF_EVENT_H

#include "lf_types.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef enum {
  LF_EVENT_NONE = 0,
  LF_EVENT_TEXT,
  LF_EVENT_BUTTON,
  LF_EVENT_TIMER,
  LF_EVENT_SENSOR,
  LF_EVENT_IM,
  LF_EVENT_SYSTEM,
  LF_EVENT_TOOL_RESULT
} lf_event_type_t;

typedef struct {
  lf_event_type_t type;
  char source[LF_MAX_ID];
  lf_text_t payload;
  uint64_t timestamp_ms;
} lf_event_t;

typedef struct {
  lf_event_t items[LF_MAX_EVENT_QUEUE];
  size_t head;
  size_t tail;
  size_t count;
} lf_event_queue_t;

void lf_event_queue_init(lf_event_queue_t *queue);
lf_status_t lf_event_push(lf_event_queue_t *queue, const lf_event_t *event);
lf_status_t lf_event_pop(lf_event_queue_t *queue, lf_event_t *out_event);
bool lf_event_queue_is_empty(const lf_event_queue_t *queue);

#ifdef __cplusplus
}
#endif

#endif
