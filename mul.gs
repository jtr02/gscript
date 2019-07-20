**************************************************************
* mul Ver 0.04
*
* function:
*   set multi-window
* usage:
*   mul imax jmax ipos jpos [-xoffset value/0] [-yoffset value/0] [-novpage]
*     imax    : number of window horizontally ( 1<= imax <= 5 )
*     jmax    : number of window vertically ( 1<= jmax <= 5 )
*     ipos    : horizontal position (count from left window)
*     jpos    : vertical position (count from bottom window)
*     xoffset : offset of horizontal position
*     yoffset : offset of vertical position
*     novpage : avoid "set vpage"
* note:
*  [arg-name / **] : no need to type (** is default value)
*
*
* history
* 2004.07.30  Ver0.01 release
* 2005.04.13  (5,5) is supported
* 2005.07.12  The limitation of combination of imax and jmax is excluded.
*             Ver0.02 release
* 2005.08.23  -xoffset, -yoffset are supported
*             Ver0.03 release
* 2008.01.18  portrait is supported
*             -novpage is supported
*             Ver0.04 release
*
*
**************************************************************
function mul(args)

*** arguement ***
imax = subwrd( args, 1 )
jmax = subwrd( args, 2 )
ipos = subwrd( args, 3 )
jpos = subwrd( args, 4 )


xoffset = 0
yoffset = 0
novpage = 0

i = 5
arg = "dummy"
while( arg != "" )
  arg = subwrd( args, i )
  i = i + 1

  if( arg = "-xoffset" )
    xoffset = subwrd( args, i )
    i = i + 1
  endif
  if( arg = "-yoffset" )
    yoffset = subwrd( args, i )
    i = i + 1
  endif
  if( arg = "-novpage" )
    novpage = 1
  endif

endwhile



***** get real page *****
'q gxinfo'
temp = sublin( result, 2 )
vpagex = subwrd( temp, 4 )
vpagey = subwrd( temp, 6 )



***** set value (landscape) *****

***** imax *****
*** 1 ***
xini.1 = 1.0
xwid.1 = 9.5
xint.1 = 0.0

*** 2 ***
xini.2 = 1.0
xwid.2 = 4.5
xint.2 = 0.5

*** 3 ***
xini.3 = 1.0
xwid.3 = 3.0
xint.3 = 0.4

*** 4 ***
xini.4 = 0.4
xwid.4 = 2.3
xint.4 = 0.4

*** 5 ***
xini.5 = 0.9
xwid.5 = 1.9
xint.5 = 0.1


***** jmax *****
*** 1 ***
yini.1 = 1.0
ywid.1 = 7.0
yint.1 = 0.0

*** 2 ***
yini.2 = 1.0
ywid.2 = 3.0
yint.2 = 1.0

*** 3 ***
yini.3 = 0.8
ywid.3 = 2.0
yint.3 = 0.5

*** 4 ***
yini.4 = 0.6
ywid.4 = 1.5
yint.4 = 0.4

*** 5 ***
yini.5 = 0.6
ywid.5 = 1.4
yint.5 = 0.1



***** set value (portrait) *****
if( vpagex = 8.5 & vpagey = 11 )
  k = 1
  while( k <= 5 )
    ini = xini.k
    wid = xwid.k
    int = xint.k
    xini.k = yini.k
    xwid.k = ywid.k
    xint.k = yint.k
    yini.k = ini
    ywid.k = wid
    wint.k = int
    k = k + 1
  endwhile

endif



***** set parea *****
xmin = xini.imax + (xwid.imax + xint.imax) * (ipos-1) + xoffset
xmax = xini.imax + (xwid.imax + xint.imax) * (ipos-1) + xwid.imax + xoffset
ymin = yini.jmax + (ywid.jmax + yint.jmax) * (jpos-1) + yoffset
ymax = yini.jmax + (ywid.jmax + yint.jmax) * (jpos-1) + ywid.jmax + yoffset

say 'set parea (by mul) -> xmin='xmin' xmax='xmax' ymin='ymin' ymax='ymax
if( novpage = 0 )
  'set vpage 0 'vpagex' 0 'vpagey
endif
'set parea 'xmin' 'xmax' 'ymin' 'ymax

return
