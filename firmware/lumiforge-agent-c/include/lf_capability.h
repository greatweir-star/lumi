#ifndef LF_CAPABILITY_H
#define LF_CAPABILITY_H

#include "lf_types.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef enum {
  LF_CAP_HARDWARE = 0,
  LF_CAP_SYSTEM,
  LF_CAP_NETWORK,
  LF_CAP_MEMORY,
  LF_CAP_IM,
  LF_CAP_MCP,
  LF_CAP_LUA,
  LF_CAP_SKILL,
  LF_CAP_STORAGE,
  LF_CAP_SCHEDULER
} lf_capability_kind_t;

typedef struct {
  char id[LF_MAX_ID];
  char name[LF_MAX_ID];
  lf_capability_kind_t kind;
  bool enabled;
} lf_capability_t;

typedef struct {
  lf_capability_t items[LF_MAX_CAPABILITIES];
  size_t count;
} lf_capability_registry_t;

void lf_capability_registry_init(lf_capability_registry_t *registry);
lf_status_t lf_capability_register(lf_capability_registry_t *registry, const lf_capability_t *capability);
lf_capability_t *lf_capability_find(lf_capability_registry_t *registry, const char *id);
lf_status_t lf_capability_set_enabled(lf_capability_registry_t *registry, const char *id, bool enabled);

#ifdef __cplusplus
}
#endif

#endif
