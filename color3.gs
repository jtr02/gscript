**************************************************************
* color Ver 0.01
*
* function:
*   set levs/color
* usage:
*   color [-gxout value/shaded] [-kind value/bluered]
*         (-var variable | min max [int])
*     -gxout value  : gxout (= shaded, contour)
*     -kind value   : kind of color style (= bluered, )
*     -var variable : variable you'll draw
*     min max [int] : minimum and maximum values of the graphic
* note:
*
*   note:[arg-name / **] : no need to type (** is default value)
*        (arg1 | arg2)   : arg1 or arg2 must be specified
**************************************************************
function color(args)
*** initial value ***
  gxout='shaded'
  kind='bluered'
  var='none'
  min='none'
  max='none'
  int='none'


*** arguement ***
  i=1
  while(1)
    arg=subwrd(args,i)
    i=i+1;
    if(arg=''); break; endif

* option
    if(arg='-gxout'); gxout=subwrd(args,i); i=i+1; endif
    if(arg='-kind'); kind=subwrd(args,i); i=i+1; endif
    if(arg='-var'); var=subwrd(args,i); i=i+1; endif

* int, max, min
    if(valnum(arg)!=0 & min!='none' & max!='none' & int='none'); int=arg; endif
    if(valnum(arg)!=0 & min!='none' & max='none'); max=arg; endif
    if(valnum(arg)!=0 & min='none'); min=arg; endif

  endwhile


* var -> min, max, int
  if(var!='' & (min='none' | max='none'))
    'c'
    'd 'var
     min = subwrd(result,2)
     max = subwrd(result,4)
     int = subwrd(result,6)
     'c'
  endif

* min, max -> int
  if(int='none'); int=(max-min)/10; endif




*** parameter check & adjust ***
  say 'min='min' max='max' int='int' kind='kind' var='var
  if(gxout!='shaded' & gxout!='contour')
    say gxout' not supported !'
    return
  endif
  if(kind!='bluered')
    say kind' not supported !'
    return
  endif


*** calculate levels ***
  value=min
  colnum=0
  lev=''
  cols=''
  while(value<=max)
    lev=lev%' '%value
    cols=cols%' '%(colnum+16)
    value=value+int
    colnum=colnum+1
  endwhile

* one more color
  if(gxout='shaded')
    cols=cols%' '%(colnum+16)
    colnum=colnum+1
  endif

  say 'clevs='lev
  say 'ccols='cols



*** set levs/cols ***
  'set gxout 'gxout
  'set clevs 'lev
  'set ccols 'cols


*** define colors ***

  if(kind='bluered')
    bluered(colnum)
  endif



*** display color sample ***
*  i=0
*  while(i<colnum)
*    'set line 'i+16
*    'draw recf 'i*0.5' 4 'i*0.5+0.5' 5'
*    i=i+1
*  endwhile

return






*******************************************************************

* define colors
* (small) blue <-> white <-> red (big)
function bluered(colnum)

  step1=math_int((colnum)/2)
  step3=math_int((colnum)/2)
  step2=colnum-step1-step3

*  say 'step1='step1' step2='step2' step3='step3

  now=16

*** step1 blue -> white ***
  i=1
  dc=math_int(256/step1)
  while(i<=step1)
    r=dc*(i-1)/2.
    g=dc*(i-1)/2.
    b=dc*(i-1)/2.
*    say 'r='r' g='g' b='b
    'set rgb 'now' 'r' 'g' 'b

    i=i+1
    now=now+1
  endwhile


*** step2 white(in display, black) ***
  i=1
  while(i<=step2)
    r=255
    g=255
    b=255
*    say 'r='r' g='g' b='b
    'set rgb 'now' 'r' 'g' 'b

    i=i+1
    now=now+1
  endwhile


*** step3 white -> red ***
  i=1
  dc=math_int(256/step3)
  while(i<=step3)
    r=255-dc*i/2.
    g=255-dc*i/2.
    b=255-dc*i/2.
*    say 'r='r' g='g' b='b
    'set rgb 'now' 'r' 'g' 'b

    i=i+1
    now=now+1
  endwhile


return












