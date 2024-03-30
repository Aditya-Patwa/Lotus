import type { Idl } from "@project-serum/anchor"

export const idl: Idl = {
  "version": "0.1.0",
  "name": "hello_anchor",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "lotusAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "imageUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateAccount",
      "accounts": [
        {
          "name": "lotusAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "imageUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "createCategory",
      "accounts": [
        {
          "name": "categoryAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "parent",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "creator",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateCategory",
      "accounts": [
        {
          "name": "categoryAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    {
      "name": "createNote",
      "accounts": [
        {
          "name": "noteAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "data",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        },
        {
          "name": "category",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "creator",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateNote",
      "accounts": [
        {
          "name": "noteAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "data",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "LotusAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "creator",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "Category",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "parent",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "creator",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "Note",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "data",
            "type": "string"
          },
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "category",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "creator",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "Community",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "members",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "creators",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "CommunityPost",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "data",
            "type": "string"
          },
          {
            "name": "community",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};