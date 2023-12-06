import * as React from 'react';
import Button  from './Button';
import { render, screen } from '@testing-library/react';


test('render', ()=>{
    const { unmount, rerender } = render(<Button children={'boton 1'}/>);
    screen.debug();
})