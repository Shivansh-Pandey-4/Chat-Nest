import zod from "zod";


export const roomCodeSchema = zod.string().trim().length(6, "length must be 6 characters only");