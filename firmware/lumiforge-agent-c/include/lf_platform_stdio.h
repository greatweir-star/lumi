#ifndef LF_PLATFORM_STDIO_H
#define LF_PLATFORM_STDIO_H

#include "lf_agent.h"

#ifdef __cplusplus
extern "C" {
#endif

lf_status_t lf_stdio_llm_echo(const char *prompt, lf_text_t *out_text, void *user_data);
lf_status_t lf_stdio_output(const char *channel, const char *content, void *user_data);
lf_status_t lf_stdio_memory_read(const char *path, lf_text_t *out_text, void *user_data);
lf_status_t lf_stdio_memory_write(const char *path, const char *content, void *user_data);

lf_tool_t lf_builtin_tool_heap_info(void);
lf_tool_t lf_builtin_tool_memory_write(void);
lf_tool_t lf_builtin_tool_time(void);

#ifdef __cplusplus
}
#endif

#endif
