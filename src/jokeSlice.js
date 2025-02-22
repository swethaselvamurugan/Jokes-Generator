import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    joke: "",
    categories: [],
    error: null
};

const fetchJokes = createAsyncThunk("jokes/jokecategory", async function (category) {
    return axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`).then(function (result) {
        console.log(result.data.value)
        return result.data.value
    })
});

const fetchCategories = createAsyncThunk("jokes/fetchCategories", async function () {
    return axios.get("https://api.chucknorris.io/jokes/categories").then(function (result) {
        console.log(result.data)
        return result.data;
    });
});

const jokeSlice = createSlice({
    name: "joke",
    initialState,
    reducers: {},
    extraReducers: (built) => {
        built
            .addCase(fetchJokes.pending, function () {
                console.log("Loading...")
            })
            .addCase(fetchJokes.fulfilled, function (state, action) {
                state.joke = action.payload;
            })
            .addCase(fetchCategories.pending, function () {
                console.log("Loading categories...")
            })
            .addCase(fetchCategories.fulfilled, function (state, action) {
                state.categories = action.payload
            })
    }
})

export default jokeSlice

export { fetchJokes, fetchCategories }
