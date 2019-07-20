      program main
c
c abstract:
c   read the GrADS' fwrite output (grads.fwrite) and 
c   write the values in fixed columns.
c   should be stored in $GADDIR and used with textout.gs
c   when make, do not use byteswap option.
c
c written by kei yoshimura on 2007/08/01 
c
      parameter (imax=10000,jmax=1000)
      real*4 var(imax,jmax)
      integer col
      character ccol*8
c
      if (iargc().ne.1) then
        stop
      endif
      call getarg(1,ccol)
      read(ccol,*)col
c
      open(1,file='grads.fwrite',form='unformatted',
     $     access='direct',recl=4*col,status='old',
     $     err=999)
      do i=1,imax
         read(1,rec=i,err=99) (var(i,j),j=1,col)
         write(6,'('//ccol//'e15.7)') (var(i,j),j=1,col)
      enddo
c
      stop
c
 99   continue
      stop
c     
 999  continue
      write(6,*) 'No grads.fwrite'
      stop
c
      end
      
      
