import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table("leaderboard", (table)=>{
        table.dropUnique(["username"],"users_username_unique");
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table("leaderboard", (table)=>{
        table.unique(["username"]);
    })
}

