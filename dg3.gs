function dg(args) 
var1=subwrd(args,1)
var2=subwrd(args,2)
var3=subwrd(args,3)
t1=subwrd(args,4)
t2=subwrd(args,5)
c1=subwrd(args,6)
c2=subwrd(args,7)
cc=subwrd(args,8)

while (t1 <= t2)
'cc'
'set t 't1
'set ylint 'cc' '
'set vrange 'c1' 'c2' '
'q dim';line=sublin(result,5);  time=subwrd(line,6)
'set ccolor 1 ' ; 'solidline' ; 'd 'var1
'set ccolor 2 ' ; 'solidline' ; 'd 'var2
'set ccolor 4 ' ; 'solidline' ; 'd 'var3
'draw title 'time
pull x
t1 = t1 + 1

endwhile
say end" "time

