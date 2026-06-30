idf_component_register(
  SRCS
    "../../../../src/lf_agent.c"
    "../../../../src/lf_capability.c"
    "../../../../src/lf_event.c"
    "../../../../src/lf_memory.c"
    "../../../../src/lf_platform.c"
    "../../../../src/lf_tool.c"
    "../../../../ports/esp_idf/lf_platform_espidf.c"
  INCLUDE_DIRS
    "../../../../include"
    "../../../../ports/esp_idf"
  REQUIRES esp_timer
)
