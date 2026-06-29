cmake_minimum_required(VERSION 3.16)
project(lumiforge_agent_c C)

set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

add_library(lumiforge_agent_c
  src/lf_agent.c
  src/lf_capability.c
  src/lf_event.c
  src/lf_memory.c
  src/lf_platform.c
  src/lf_tool.c
  src/lf_platform_stdio.c
)

target_include_directories(lumiforge_agent_c PUBLIC include)

add_executable(lumiforge_agent_host_demo examples/host_demo/main.c)
target_link_libraries(lumiforge_agent_host_demo PRIVATE lumiforge_agent_c)
