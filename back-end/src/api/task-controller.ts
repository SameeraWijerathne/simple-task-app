import express from 'express';
import mysql, {Pool} from "promise-mysql";
import dotenv from 'dotenv';

export const router = express.Router();