#include "lf_tool.h"
#include <string.h>

void lf_tool_registry_init(lf_tool_registry_t *registry) {
  if (!registry) return;
  memset(registry, 0, sizeof(*registry));
}

lf_status_t lf_tool_register(lf_tool_registry_t *registry, const lf_tool_t *tool) {
  if (!registry || !tool || tool->id[0] == '\0' || !tool->handler) return LF_ERR_INVALID_ARG;
  lf_tool_t *existing = lf_tool_find(registry, tool->id);
  if (existing) {
    *existing = *tool;
    return LF_OK;
  }
  if (registry->count >= LF_MAX_TOOLS) return LF_ERR_FULL;
  registry->items[registry->count++] = *tool;
  return LF_OK;
}

lf_tool_t *lf_tool_find(lf_tool_registry_t *registry, const char *id) {
  if (!registry || !id) return 0;
  for (size_t i = 0; i < registry->count; i++) {
    if (strcmp(registry->items[i].id, id) == 0) return &registry->items[i];
  }
  return 0;
}

lf_status_t lf_tool_call(
  lf_tool_registry_t *registry,
  struct lf_agent_context *agent,
  const char *id,
  const char *input,
  lf_text_t *output
) {
  if (!registry || !id || !output) return LF_ERR_INVALID_ARG;
  lf_tool_t *tool = lf_tool_find(registry, id);
  if (!tool || !tool->handler) return LF_ERR_NOT_FOUND;
  return tool->handler(agent, input ? input : "", output);
}
