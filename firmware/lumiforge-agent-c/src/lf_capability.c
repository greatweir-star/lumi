#include "lf_capability.h"
#include <string.h>

void lf_capability_registry_init(lf_capability_registry_t *registry) {
  if (!registry) return;
  memset(registry, 0, sizeof(*registry));
}

lf_status_t lf_capability_register(lf_capability_registry_t *registry, const lf_capability_t *capability) {
  if (!registry || !capability || capability->id[0] == '\0') return LF_ERR_INVALID_ARG;
  lf_capability_t *existing = lf_capability_find(registry, capability->id);
  if (existing) {
    *existing = *capability;
    return LF_OK;
  }
  if (registry->count >= LF_MAX_CAPABILITIES) return LF_ERR_FULL;
  registry->items[registry->count++] = *capability;
  return LF_OK;
}

lf_capability_t *lf_capability_find(lf_capability_registry_t *registry, const char *id) {
  if (!registry || !id) return 0;
  for (size_t i = 0; i < registry->count; i++) {
    if (strcmp(registry->items[i].id, id) == 0) return &registry->items[i];
  }
  return 0;
}

lf_status_t lf_capability_set_enabled(lf_capability_registry_t *registry, const char *id, bool enabled) {
  lf_capability_t *capability = lf_capability_find(registry, id);
  if (!capability) return LF_ERR_NOT_FOUND;
  capability->enabled = enabled;
  return LF_OK;
}
