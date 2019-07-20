function func(args) 

  i = 1
  arg ="dummy"
  damp=""
  while( arg != "" )
    arg = subwrd(args,i)

    if( arg = ";" )
      say damp
      damp
      damp=""
    else 
      damp = damp' 'arg
    endif
    i = i + 1

  endwhile

