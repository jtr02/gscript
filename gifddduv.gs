function dd(args) 
var=subwrd(args,1)
t1=subwrd(args,2)
t2=subwrd(args,3)
c1=subwrd(args,4)
c2=subwrd(args,5)
cc=subwrd(args,6)
uw=subwrd(args,7)
vw=subwrd(args,8)
maskv=subwrd(args,9)

while (t1 <= t2)
'set t 't1
'xy'
'q dim';line=sublin(result,5);  time=subwrd(line,6)
say time
'color 'c1' 'c2' 'cc' '
'd 'var
cc3=cc*2.

'co'
'bl'
'set cint 'cc3
'd 'var

'co'

arange=maskv*5

'set arrscl 0.5 'arange' '

'd maskout('uw',mag('uw','vw')-'maskv');'vw'  '

'draw title 'time
  if (t1 <100)
    if (t1 <10)
      'gif i_'var'-00't1'_'time''
      else
      'gif i_'var'-0't1'_'time''
    endif
  else 
      'gif i_'var'-'t1'_'time''
  endif

t1 = t1 + 1
'c graphics'
endwhile
say end" "time

