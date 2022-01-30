import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Login} from '../components/Login';

it("renders correctly", () => {
    const {container} = render(<Login/>);

    expect(container.getElementsByClassName('email').length).toBe(1);
})