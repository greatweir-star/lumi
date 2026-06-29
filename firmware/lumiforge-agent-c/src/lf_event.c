#include "lf_event.h"
#include <string.h>

void lf_event_queue_init(lf_event_queue_t *queue) {
  if (!queue) return;
  memset(queue, 0, sizeof(*queue));
}

lf_status_t lf_event_push(lf_event_queue_t *queue, const lf_event_t *event) {
  if (!queue || !event) return LF_ERR_INVALID_ARG;
  if (queue->count >= LF_MAX_EVENT_QUEUE) return LF_ERR_FULL;
  queue->items[queue->tail] = *event;
  queue->tail = (queue->tail + 1U) % LF_MAX_EVENT_QUEUE;
  queue->count++;
  return LF_OK;
}

lf_status_t lf_event_pop(lf_event_queue_t *queue, lf_event_t *out_event) {
  if (!queue || !out_event) return LF_ERR_INVALID_ARG;
  if (queue->count == 0U) return LF_ERR_NOT_FOUND;
  *out_event = queue->items[queue->head];
  queue->head = (queue->head + 1U) % LF_MAX_EVENT_QUEUE;
  queue->count--;
  return LF_OK;
}

bool lf_event_queue_is_empty(const lf_event_queue_t *queue) {
  return !queue || queue->count == 0U;
}
