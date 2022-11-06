import { Knex } from "knex";


export async function up(knex: Knex){

    await knex.schema.table("users", (table)=>{
        table.dropColumn("profile_pic");
    })

}


export async function down(knex: Knex) {

    await knex.schema.table("users", (table)=>{
        table.string("profile_pic");
    })

}

