function dd(args) 
var=subwrd(args,1)
var2=subwrd(args,2)
t1=subwrd(args,3)
t2=subwrd(args,4)
c1=subwrd(args,5)
c2=subwrd(args,6)
cc=subwrd(args,7)
cc2=subwrd(args,8)


while (t1 <= t2)
'set t 't1
'xy'
'q dim';line=sublin(result,5);  time=subwrd(line,6)
say time
'color 'c1' 'c2' 'cc' '
'd 'var
cc3=cc2*2.

'co'
'bl'
'set cint 'cc3
'd 'var2
'draw title 'time
  if (t1 <100)
    if (t1 <10)
      'gif 'var'_'var2'-00't1'_'time''
      else
      'gif 'var'_'var2'-0't1'_'time''
    endif
  else 
      'gif 'var'_'var2'-'t1'_'time''
  endif

t1 = t1 + 1
'c graphics'
endwhile
say end" "time

