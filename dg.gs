function dg(args) 
var=subwrd(args,1)
t1=subwrd(args,2)
t2=subwrd(args,3)
c1=subwrd(args,4)
c2=subwrd(args,5)
cc=subwrd(args,6)

while (t1 <= t2)
'set t 't1
'set ylint 'cc' '
'set vrange 'c1' 'c2' '
'd 'var
pull x
t1 = t1 + 1
'c graphics'
endwhile
say end" "time

