function gifdg(args) 
var=subwrd(args,1)
t1=subwrd(args,2)
t2=subwrd(args,3)
c1=subwrd(args,4)
c2=subwrd(args,5)
cc=subwrd(args,6)

while (t1 <= t2)
'set t 't1
'xy'
'q dim';line=sublin(result,5);  time=subwrd(line,6)
'set ylint 'cc' '
'set vrange 'c1' 'c2' '

'd 'var
'draw title 'time
  if (t1 <100)
    if (t1 <10)
      'gif 'var'-00't1'_'time''
      else
      'gif 'var'-0't1'_'time''
    endif
  else 
      'gif 'var'-'t1'_'time''
  endif


t1 = t1 + 1
'c graphics'
endwhile
say end" "time



