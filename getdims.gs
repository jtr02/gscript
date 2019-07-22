'q dims'

str=sublin(result,2)
type=subwrd(str,3)
if(type='fixed')
sx=subwrd(str,9)
ex=sx
slon=subwrd(str,6)
elon=slon
else
sx=subwrd(str,11)
ex=subwrd(str,13)
slon=subwrd(str,6)
elon=subwrd(str,8)
endif

say 'sx='sx', ex='ex
say 'slon='slon', elon='elon

str=sublin(result,3)
type=subwrd(str,3)
if(type='fixed')
sy=subwrd(str,9)
ey=sy
slat=subwrd(str,6)
elat=slat
else
sy=subwrd(str,11)
ey=subwrd(str,13)
slat=subwrd(str,6)
elat=subwrd(str,8)
endif

say 'sy='sy', ey='ey
say 'slat='slat', elat='elat

str=sublin(result,4)
type=subwrd(str,3)
if(type='fixed')
sz=subwrd(str,9)
ez=sz
slev=subwrd(str,6)
elev=slev
else
sz=subwrd(str,11)
ez=subwrd(str,13)
slev=subwrd(str,6)
elev=subwrd(str,8)
endif

say 'sz='sz', ez='ez
say 'slev='slev', elev='elev

str=sublin(result,5)
type=subwrd(str,3)
if(type='fixed')
st=subwrd(str,9)
et=st
stime=subwrd(str,6)
etime=stime
else
st=subwrd(str,11)
et=subwrd(str,13)
stime=subwrd(str,6)
etime=subwrd(str,8)
endif

say 'st='st', et='et
say 'stime='stime', etime='etime

str=sublin(result,6)
type=subwrd(str,3)
if(type='fixed')
se=subwrd(str,9)
ee=se
smem=subwrd(str,6)
emem=smem
else
se=subwrd(str,11)
ee=subwrd(str,13)
smem=subwrd(str,6)
emem=subwrd(str,8)
endif

say 'se='se', ee='ee
say 'smem='smem', emem='emem
