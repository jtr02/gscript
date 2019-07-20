'q dims'

str=sublin(result,2)
type=subwrd(str,3)
if(type='fixed')
sx=subwrd(str,9)
ex=sx
else
sx=subwrd(str,11)
ex=subwrd(str,13)
endif

say 'sx='sx', ex='ex

str=sublin(result,3)
type=subwrd(str,3)
if(type='fixed')
sy=subwrd(str,9)
ey=sy
else
sy=subwrd(str,11)
ey=subwrd(str,13)
endif

say 'sy='sy', ey='ey

str=sublin(result,4)
type=subwrd(str,3)
if(type='fixed')
sz=subwrd(str,9)
ez=sz
else
sz=subwrd(str,11)
ez=subwrd(str,13)
endif

say 'sz='sz', ez='ez

str=sublin(result,5)
type=subwrd(str,3)
if(type='fixed')
stime=subwrd(str,6)
etime=stime
st=subwrd(str,9)
et=st
else
stime=subwrd(str,6)
etime=subwrd(str,8)
st=subwrd(str,11)
et=subwrd(str,13)
endif

say 'stime='stime', etime='etime
say 'st='st', et='et
