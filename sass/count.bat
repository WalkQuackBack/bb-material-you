@echo off

cls

setlocal EnableDelayedExpansion

set /a total=0

(

 for %%f in (*.sass) do (

  for /f %%a in ('type "%%f"^|find /C /v  "" ') do set /a total+=%%a&echo %%f %%a

 )

 echo total !total!

)>>list.txt

GOTO :EOF