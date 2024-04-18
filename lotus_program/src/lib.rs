use anchor_lang::prelude::*;


// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("2T8nS5g6szDurxKHS2RGwr1ve9MBhxyX73t7HsLFFBAs");

#[program]
mod hello_anchor {
    use super::*;
    pub fn initialize(
        ctx: Context<Initialize>,
        name: String,
        image_url: String
    ) -> Result<()> {
        
        ctx.accounts.lotus_account.name = name.clone();
        ctx.accounts.lotus_account.image_url = image_url.clone();
        ctx.accounts.lotus_account.creator = ctx.accounts.signer.key();
        msg!("Changed data to: {}!", name); // Message will show up in the tx logs
        Ok(())
    }

    pub fn update_account(
        ctx: Context<UpdateAccount>,
        name: String,
        image_url: String
    ) -> Result<()> {
        let lotus_account = &mut ctx.accounts.lotus_account;
        lotus_account.name = name.clone();
        lotus_account.image_url = image_url.clone();
        Ok(())
    }

    pub fn create_category(
        ctx: Context<CreateCategory>,
        name: String,
        description: String,
        parent: Option<Pubkey>,
        creator:Pubkey
    ) -> Result<()> {
        let category_account = &mut ctx.accounts.category_account;
        category_account.name = name.clone();
        category_account.description = description.clone();
        category_account.parent = parent;
        category_account.creator = creator;

        Ok(())
    }

    pub fn update_category(
        ctx: Context<UpdateCategory>,
        name: String,
        description: String,
    ) -> Result<()> {
        let category_account = &mut ctx.accounts.category_account;
        category_account.name = name.clone();
        category_account.description = description.clone();

        Ok(())
    }

    pub fn create_note(
        ctx: Context<CreateNote>,
        name: String,
        data: String,
        url: String,
        category: Option<Pubkey>,
        creator: Pubkey
    ) -> Result<()> {
        let note_account = &mut ctx.accounts.note_account;
        note_account.name = name.clone();
        note_account.data = data.clone();
        note_account.url = url.clone();
        note_account.category = category;
        note_account.creator = creator; 



        Ok(())
    }

    pub fn update_note(
        ctx: Context<UpdateNote>,
        name: String,
        data: String,
    ) -> Result<()> {
        let note_account = &mut ctx.accounts.note_account;
        note_account.name = name.clone();
        note_account.data = data.clone();

        Ok(())
    }

    pub fn create_community(
        ctx: Context<CreateCommunity>,
        name: String,
        description: String,
        creator: Pubkey
    ) -> Result<()> {
        let community_account = &mut ctx.accounts.community_account;
        community_account.name = name.clone();
        community_account.description = description.clone();
        community_account.members = Vec::new();
        community_account.members.push(creator);
        community_account.creator = creator;

        Ok(())
    }

    pub fn join_community(ctx: Context<JoinCommunity>, member: Pubkey) -> Result<()> {
        let community_account = &mut ctx.accounts.community_account;

        community_account.members.push(member);

        Ok(())
    }

    pub fn update_community(ctx: Context<UpdateCommunity>, name: String, description: String) -> Result<()> {
        let community_account = &mut ctx.accounts.community_account;

        community_account.name = name.clone();
        community_account.description = description.clone();

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // We must specify the space in order to initialize an account.
    // First 8 bytes are default account discriminator,
    // next 8 bytes come from NewAccount.data being type u64.
    // (u64 = 64 bits unsigned integer = 8 bytes)
    #[account(init, payer = signer, space = 4+50+4+255+16)]
    pub lotus_account: Account<'info, LotusAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateAccount<'info> {
    #[account(mut)]
    pub lotus_account: Account<'info, LotusAccount>,
}

#[derive(Accounts)]
pub struct CreateCategory<'info> {
    #[account(init, payer = signer, space = 4+20+4+300+1+32+32)]
    pub category_account: Account<'info, Category>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateCategory<'info> {
    #[account(mut)]
    pub category_account: Account<'info, Category>,
}

#[derive(Accounts)]
pub struct CreateNote<'info> {
    #[account(init, payer=signer, space = 4+20+4+300+4+200+1+32+32)]
    pub note_account: Account<'info, Note>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateNote<'info> {
    #[account(mut)]
    pub note_account: Account<'info, Note>,
}

#[derive(Accounts)]
pub struct CreateCommunity<'info> {
    #[account(init, payer=signer, space = 4+50+4+500+3200+32)]
    pub community_account: Account<'info, Community>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct JoinCommunity<'info> {
    #[account(mut)]
    pub community_account: Account<'info, Community>,
}


#[derive(Accounts)]
pub struct UpdateCommunity<'info> {
    #[account(mut)]
    pub community_account: Account<'info, Community>,
}


#[account]
pub struct LotusAccount {
    name: String,
    image_url: String,
    creator: Pubkey,
}

#[account]
pub struct Category {
    name: String,
    description: String,
    parent: Option<Pubkey>,
    creator: Pubkey,
}

#[account]
pub struct Note {
    name: String,
    data: String,
    url: String,
    category: Option<Pubkey>,
    creator: Pubkey
}

#[account]
pub struct Community {
    name: String,
    description: String,
    members: Vec<Pubkey>,
    creator: Pubkey,
}

#[account]
pub struct CommunityPost {
    data: String,
    community: Pubkey,
    creator: Pubkey,
}
