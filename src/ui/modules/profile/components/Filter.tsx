import { Input } from "antd";
import { observer } from "mobx-react";
import * as React from 'react';

export const Filter = observer(() => <Input.Search placeholder="Filter ..." />);
