import { types } from "mobx-state-tree";
import { AppStore } from "./app";

export const Store = types.model({
	apps: types.optional(AppStore, { data: {} }),
});

export const store = Store.create();
