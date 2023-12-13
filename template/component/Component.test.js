import * as React from 'react';
import Component  from './Component';
import { render, screen } from '@testing-library/react';


test('render', ()=>{
    const { unmount, rerender } = render(<Component children={'example'}/>);
    screen.debug();
    unmount();
})