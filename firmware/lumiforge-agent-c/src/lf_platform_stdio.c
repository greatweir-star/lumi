#include "lf_platform_stdio.h"
#include <stdio.h>
#include <string.h>
#include <time.h>

lf_status_t lf_stdio_llm_echo(const char *prompt, lf_text_t *out_text, void *user_data) {
  (void)user_data;
  if (!prompt || !out_text) return LF_ERR_INVALID_ARG;
  (void)snprintf(out_text->data, sizeof(out_text->data), "[mock-llm] 已处理输入，prompt 长度=%lu", (unsigned long)strlen(prompt));
  out_text->len = strnlen(out_text->data, sizeof(out_text->data));
  return LF_OK;
}

lf_status_t lf_stdio_output(const char *channel, const char *content, void *user_data) {
  (void)user_data;
  printf("[%s] %s\n", channel ? channel : "local", content ? content : "");
  return LF_OK;
}

lf_status_t lf_stdio_memory_read(const char *path, lf_text_t *out_text, void *user_data) {
  (void)user_data;
  if (!path || !out_text) return LF_ERR_INVALID_ARG;
  FILE *file = fopen(path, "r");
  if (!file) return LF_ERR_NOT_FOUND;
  size_t read = fread(out_text->data, 1, sizeof(out_text->data) - 1U, file);
  out_text->data[read] = '\0';
  out_text->len = read;
  fclose(file);
  return LF_OK;
}

lf_status_t lf_stdio_memory_write(const char *path, const char *content, void *user_data) {
  (void)user_data;
  if (!path || !content) return LF_ERR_INVALID_ARG;
  FILE *file = fopen(path, "w");
  if (!file) return LF_ERR_PLATFORM;
  fputs(content, file);
  fclose(file);
  return LF_OK;
}

static lf_status_t lf_tool_heap_info(struct lf_agent_context *agent, const char *input, lf_text_t *output) {
  (void)agent;
  (void)input;
  (void)snprintf(output->data, sizeof(output->data), "heap_info: host demo does not expose heap metrics");
  output->len = strnlen(output->data, sizeof(output->data));
  return LF_OK;
}

static lf_status_t lf_tool_memory_write(struct lf_agent_context *agent, const char *input, lf_text_t *output) {
  if (!agent || !input || !output) return LF_ERR_INVALID_ARG;
  lf_status_t status = LF_ERR_INVALID_ARG;
  if (agent->memory.memory_path) {
    status = lf_memory_append_line(&agent->memory, agent->memory.memory_path, input);
  }
  (void)snprintf(output->data, sizeof(output->data), "memory_write: %s", status == LF_OK ? "ok" : "failed");
  output->len = strnlen(output->data, sizeof(output->data));
  return status;
}

static lf_status_t lf_tool_time(struct lf_agent_context *agent, const char *input, lf_text_t *output) {
  (void)agent;
  (void)input;
  time_t now = time(0);
  (void)snprintf(output->data, sizeof(output->data), "unix_time=%ld", (long)now);
  output->len = strnlen(output->data, sizeof(output->data));
  return LF_OK;
}

lf_tool_t lf_builtin_tool_heap_info(void) {
  lf_tool_t tool;
  memset(&tool, 0, sizeof(tool));
  (void)snprintf(tool.id, sizeof(tool.id), "heap_info");
  (void)snprintf(tool.description, sizeof(tool.description), "Return host or device heap information.");
  tool.visible_to_llm = true;
  tool.handler = lf_tool_heap_info;
  return tool;
}

lf_tool_t lf_builtin_tool_memory_write(void) {
  lf_tool_t tool;
  memset(&tool, 0, sizeof(tool));
  (void)snprintf(tool.id, sizeof(tool.id), "memory_write");
  (void)snprintf(tool.description, sizeof(tool.description), "Append a line into local long-term memory.");
  tool.visible_to_llm = true;
  tool.handler = lf_tool_memory_write;
  return tool;
}

lf_tool_t lf_builtin_tool_time(void) {
  lf_tool_t tool;
  memset(&tool, 0, sizeof(tool));
  (void)snprintf(tool.id, sizeof(tool.id), "get_current_time");
  (void)snprintf(tool.description, sizeof(tool.description), "Return current Unix time.");
  tool.visible_to_llm = true;
  tool.handler = lf_tool_time;
  return tool;
}
