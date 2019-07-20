*** create a text file with preferred number of columns ***
*
* abstract:
*   save data using fwrite in direct binary format
*   and rewrite it in multi-column text format into the file.
*   should be stored in $GADDIR.
*   requires grd2txt.f
*
* written by kei yoshimura on 2007/08/01 
*

function to(args)

cnum=subwrd(args,1)
tfile=subwrd(args,2)
func=subwrd(args,3)

if func = ""
 say "Usage: textout colnumber outputfile function"
 exit
endif

'q gxout'
gxinfo=result
rec=sublin(gxinfo,4)
orggx=subwrd(rec,6)

'set gxout fwrite'
'd 'func
'disable fwrite'

'! ${GADDIR}/grd2txt 'cnum' > 'tfile

'! rm grads.fwrite'
'set gxout 'orggx

exit




