#ifndef LF_TOOL_H
#define LF_TOOL_H

#include "lf_types.h"

#ifdef __cplusplus
extern "C" {
#endif

struct lf_agent_context;

typedef lf_status_t (*lf_tool_handler_t)(
  struct lf_agent_context *agent,
  const char *input,
  lf_text_t *output
);

typedef struct {
  char id[LF_MAX_ID];
  char description[LF_MAX_TEXT];
  bool visible_to_llm;
  lf_tool_handler_t handler;
} lf_tool_t;

typedef struct {
  lf_tool_t items[LF_MAX_TOOLS];
  size_t count;
} lf_tool_registry_t;

void lf_tool_registry_init(lf_tool_registry_t *registry);
lf_status_t lf_tool_register(lf_tool_registry_t *registry, const lf_tool_t *tool);
lf_tool_t *lf_tool_find(lf_tool_registry_t *registry, const char *id);
lf_status_t lf_tool_call(
  lf_tool_registry_t *registry,
  struct lf_agent_context *agent,
  const char *id,
  const char *input,
  lf_text_t *output
);

#ifdef __cplusplus
}
#endif

#endif
