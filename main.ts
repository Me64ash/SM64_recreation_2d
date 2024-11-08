enum ActionKind {
    Walking,
    Idle,
    Jumping,
    bounce
}
namespace SpriteKind {
    export const Block = SpriteKind.create()
    export const Debris = SpriteKind.create()
    export const letter = SpriteKind.create()
    export const Ui = SpriteKind.create()
    export const Start_sprites = SpriteKind.create()
    export const COIN_Y = SpriteKind.create()
    export const Coingone = SpriteKind.create()
    export const Cam = SpriteKind.create()
    export const Pipe = SpriteKind.create()
    export const Door = SpriteKind.create()
    export const PlayerAnim = SpriteKind.create()
    export const PaintWarp = SpriteKind.create()
    export const Star = SpriteKind.create()
    export const Box = SpriteKind.create()
    export const Gombaset1 = SpriteKind.create()
    export const Trigger1 = SpriteKind.create()
    export const CoinAnim = SpriteKind.create()
}
function MoveAnims () {
    if (Cutscene == false) {
        characterAnimations.loopFrames(
        MarioAnim,
        assets.animation`myAnim`,
        78,
        characterAnimations.rule(Predicate.FacingUp, Predicate.MovingUp)
        )
        characterAnimations.loopFrames(
        MarioAnim,
        assets.animation`Mario Idle F Anim`,
        500,
        characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
        )
        characterAnimations.loopFrames(
        MarioAnim,
        assets.animation`Mario Run L`,
        90,
        characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft)
        )
        characterAnimations.loopFrames(
        MarioAnim,
        assets.animation`Mario Idle L Anim`,
        500,
        characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
        )
        characterAnimations.loopFrames(
        MarioAnim,
        assets.animation`myAnim0`,
        78,
        characterAnimations.rule(Predicate.FacingDown, Predicate.MovingDown)
        )
        characterAnimations.loopFrames(
        MarioAnim,
        assets.animation`Mario Idle F Anim2`,
        500,
        characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
        )
        characterAnimations.loopFrames(
        MarioAnim,
        assets.animation`Mario Run R`,
        90,
        characterAnimations.rule(Predicate.FacingRight, Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        MarioAnim,
        assets.animation`Mario Idle R Anim`,
        500,
        characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
        )
        characterAnimations.loopFrames(
        MarioAnim,
        assets.animation`Jump2`,
        500,
        characterAnimations.rule(Predicate.FacingRight, Predicate.MovingUp)
        )
        characterAnimations.loopFrames(
        MarioAnim,
        assets.animation`Jump1`,
        500,
        characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingUp)
        )
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Start == true) {
        if (Cutscene == false) {
            if (MOVE == true) {
                if (_2D == false) {
                    characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingUp, Predicate.MovingUp))
                }
            }
        }
    }
})
function GAME_OVER () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Block)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    sprites.destroyAllSpritesOfKind(SpriteKind.Ui)
    sprites.destroyAllSpritesOfKind(SpriteKind.Start_sprites)
    sprites.destroyAllSpritesOfKind(SpriteKind.COIN_Y)
    sprites.destroyAllSpritesOfKind(SpriteKind.Cam)
    sprites.destroyAllSpritesOfKind(SpriteKind.PlayerAnim)
    sprites.destroyAllSpritesOfKind(SpriteKind.Door)
    tiles.setCurrentTilemap(tilemap`Start screen GaOv`)
    timer.after(6000, function () {
        game.reset()
    })
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Cam, function (sprite, otherSprite) {
    if (Start == true) {
        sprites.destroy(otherSprite)
        Pipe = sprites.create(assets.image`invis`, SpriteKind.Pipe)
        tiles.placeOnTile(Pipe, tiles.getTileLocation(14, 39))
        animation.runImageAnimation(
        Pipe,
        assets.animation`myAnim2`,
        65,
        false
        )
        timer.after(2000, function () {
            Mario.setFlag(SpriteFlag.Invisible, false)
            animation.runImageAnimation(
            Mario,
            assets.animation`myAnim4`,
            65,
            false
            )
            timer.after(2000, function () {
                animation.runImageAnimation(
                Pipe,
                assets.animation`myAnim3`,
                65,
                false
                )
                timer.after(1000, function () {
                    Cutscene = false
                    Door_sl = sprites.create(assets.image`D1`, SpriteKind.Door)
                    Door_sl.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(Door_sl, tiles.getTileLocation(18, 14))
                    Door_sr = sprites.create(assets.image`D2`, SpriteKind.Door)
                    Door_sr.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(Door_sr, tiles.getTileLocation(19, 14))
                    Mario.setImage(assets.image`Mario Idle F Cutscene 16x16`)
                    scene.cameraFollowSprite(Mario)
                    Mario.setFlag(SpriteFlag.Invisible, true)
                    Mario.setImage(assets.image`Hit box`)
                    MarioAnim = sprites.create(assets.image`Mario Idle F`, SpriteKind.PlayerAnim)
                    MOVE = true
                    controller.moveSprite(Mario, 80, 80)
                    MoveAnims()
                    MarioAnim.setPosition(Mario.x, Mario.y)
                    sprites.destroy(Pipe)
                    DoorStart = true
                    characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving))
                })
            })
        })
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (First == true) {
        if (Start == false) {
            hand.setImage(assets.image`hand2`)
            if (hand.overlapsWith(Mario_head)) {
                animation.stopAnimation(animation.AnimationTypes.All, Mario_head)
                animation.runImageAnimation(
                Mario_head,
                assets.animation`myAnim7`,
                250,
                false
                )
                timer.after(650, function () {
                    animation.stopAnimation(animation.AnimationTypes.All, Mario_head)
                    animation.runImageAnimation(
                    Mario_head,
                    assets.animation`myAnim6`,
                    250,
                    true
                    )
                })
            }
            if (hand.overlapsWith(Press_start)) {
                Start = true
                if (Start == true) {
                    Castle_Front()
                }
            }
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Cutscene == false) {
        if (_2D == true) {
            if (Mario.isHittingTile(CollisionDirection.Bottom)) {
                Gravity = false
                if (characterAnimations.matchesRule(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)) || characterAnimations.matchesRule(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingRight))) {
                    characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingUp))
                }
                if (characterAnimations.matchesRule(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)) || characterAnimations.matchesRule(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft))) {
                    characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingUp))
                }
                Mario.setVelocity(0, -200)
                timer.after(334, function () {
                    Gravity = true
                })
            }
        }
    }
    if (Start == true) {
        if (Cutscene == false) {
            if (DoorStart == false) {
                if (BBBE == true) {
                    if (Mario.overlapsWith(BattleWarp)) {
                        controller.moveSprite(Mario, 0, 0)
                        tiles.setWallAt(tiles.getTileLocation(1, 7), false)
                        tiles.setWallAt(tiles.getTileLocation(1, 8), false)
                        Cutscene = true
                        Mario.follow(BP, 50)
                        MarioAnim.setFlag(SpriteFlag.Invisible, true)
                        Mario.setFlag(SpriteFlag.Invisible, false)
                        Mario.setImage(assets.image`Mario Jumping L`)
                    }
                }
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.COIN_Y, function (sprite, otherSprite) {
    if (Start == true) {
        if (Health_ui == 8) {
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            sprites.destroy(otherSprite)
            Health_ui += 0
            Coin_ui += 1
        } else {
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            sprites.destroy(otherSprite)
            Health_ui += 1
            Coin_ui += 1
        }
    }
})
function Castle_Front () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Start_sprites)
    Cutscene = true
    Camera = sprites.create(assets.image`invisB`, SpriteKind.Cam)
    Camera.setFlag(SpriteFlag.Invisible, true)
    game.setDialogFrame(assets.image`Letter back`)
    game.setDialogCursor(assets.image`A`)
    game.setDialogTextColor(15)
    game.showLongText("Dear Mario: Please come to the castle. I've baked a cake for you. Yours truly-- Princess Toadstool  Peach ", DialogLayout.Full)
    tiles.setCurrentTilemap(tilemap`level`)
    Mario = sprites.create(assets.image`Hit box`, SpriteKind.Player)
    Mario.setFlag(SpriteFlag.Invisible, true)
    scene.setBackgroundColor(13)
    tiles.placeOnTile(Mario, tiles.getTileLocation(14, 38))
    Camera.setFlag(SpriteFlag.GhostThroughWalls, true)
    tiles.placeOnTile(Camera, tiles.getTileLocation(19, 10))
    scene.cameraFollowSprite(Camera)
    Camera.follow(Mario, 150)
    for (let value of tiles.getTilesByType(assets.tile`myTile36`)) {
        Coin_YI = sprites.create(assets.image`Coin sprite`, SpriteKind.COIN_Y)
        animation.runImageAnimation(
        Coin_YI,
        assets.animation`myAnim1`,
        50,
        true
        )
        tiles.placeOnTile(Coin_YI, value)
        tiles.setTileAt(value, assets.tile`myTile38`)
    }
    Ui2()
}
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    if (Start == true) {
        if (Cutscene == false) {
            if (MOVE == true) {
                if (_2D == false) {
                    timer.after(30, function () {
                        if (Mario.vx == 0 && Mario.vy == 0) {
                            characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving))
                        }
                    })
                }
            }
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Cutscene == false) {
        if (_2D == true) {
            if (Mario.isHittingTile(CollisionDirection.Bottom)) {
                characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft))
            }
        }
    }
    if (Start == true) {
        if (Cutscene == false) {
            if (MOVE == true) {
                if (_2D == false) {
                    characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft))
                }
            }
        }
    }
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (Cutscene == false) {
        if (_2D == true) {
            if (Mario.isHittingTile(CollisionDirection.Bottom)) {
                timer.after(30, function () {
                    if (Mario.vx == 0) {
                        characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving))
                    }
                })
            }
        }
    }
    if (Start == true) {
        if (Cutscene == false) {
            if (MOVE == true) {
                if (_2D == false) {
                    timer.after(30, function () {
                        if (Mario.vx == 0 && Mario.vy == 0) {
                            characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving))
                        }
                    })
                }
            }
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (Cutscene == false) {
        if (_2D == true) {
            if (Mario.isHittingTile(CollisionDirection.Bottom)) {
                timer.after(30, function () {
                    if (Mario.vx == 0) {
                        characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving))
                    }
                })
            }
        }
    }
    if (Start == true) {
        if (Cutscene == false) {
            if (MOVE == true) {
                if (_2D == false) {
                    timer.after(30, function () {
                        if (Mario.vx == 0 && Mario.vy == 0) {
                            characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving))
                        }
                    })
                }
            }
        }
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Cutscene == false) {
        if (_2D == true) {
            if (Mario.isHittingTile(CollisionDirection.Bottom)) {
                characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingRight))
            }
        }
    }
    if (Start == true) {
        if (Cutscene == false) {
            if (MOVE == true) {
                if (_2D == false) {
                    characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingRight))
                }
            }
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (Cutscene == false) {
        if (_2D == true) {
            Gravity = true
        }
    }
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    if (Start == true) {
        if (Cutscene == false) {
            if (MOVE == true) {
                if (_2D == false) {
                    timer.after(30, function () {
                        if (Mario.vx == 0 && Mario.vy == 0) {
                            characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving))
                        }
                    })
                }
            }
        }
    }
})
function Bobomb_Battlefield () {
    Gombaset = 1
    controller.moveSprite(Mario, 100, 0)
    Cutscene = false
    tiles.setCurrentTilemap(tilemap`Bob-omb Battlefield`)
    for (let value of tiles.getTilesByType(assets.tile`myTile105`)) {
        Gomba = sprites.create(assets.image`myImage1`, SpriteKind.Gombaset1)
        tiles.placeOnTile(Gomba, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile107`)) {
        if (Gombaset == 1) {
            EnemyMoveNow1 = sprites.create(assets.image`Hit box`, SpriteKind.Trigger1)
            EnemyMoveNow1.setFlag(SpriteFlag.Invisible, true)
            tiles.placeOnTile(EnemyMoveNow1, value)
            tiles.setTileAt(value, assets.tile`transparency16`)
        }
    }
    _2D = true
    Gravity = true
    Mario.setFlag(SpriteFlag.Invisible, true)
    MarioAnim.setFlag(SpriteFlag.Invisible, false)
    Mario.setImage(assets.image`Hit box`)
    sprites.destroyAllSpritesOfKind(SpriteKind.PaintWarp)
    sprites.destroyAllSpritesOfKind(SpriteKind.Door)
    sprites.destroyAllSpritesOfKind(SpriteKind.COIN_Y)
    for (let value of tiles.getTilesByType(assets.tile`myTile102`)) {
        Red_bobomb = sprites.create(assets.image`Pink Bob-omb`, SpriteKind.Player)
        tiles.placeOnTile(Red_bobomb, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile103`)) {
        Coin_YI = sprites.create(assets.image`Coin sprite`, SpriteKind.COIN_Y)
        animation.runImageAnimation(
        Coin_YI,
        assets.animation`myAnim1`,
        50,
        true
        )
        tiles.placeOnTile(Coin_YI, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`Wing box`)) {
        WingBox = sprites.create(assets.image`E Block WingE`, SpriteKind.Box)
        tiles.placeOnTile(WingBox, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    scene.setBackgroundImage(assets.image`Sky`)
    tiles.placeOnTile(Mario, tiles.getTileLocation(2, 45))
    MarioAnim.z += 1
    characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingUp))
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Start == true) {
        if (Cutscene == false) {
            if (MOVE == true) {
                if (_2D == false) {
                    characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingDown, Predicate.MovingDown))
                }
            }
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    if (First == true) {
        if (Start == false) {
            hand.setImage(assets.image`hand`)
        }
    }
})
function Ui2 () {
    Ammount = sprites.create(assets.image`X`, SpriteKind.Ui)
    Ammount.setFlag(SpriteFlag.GhostThroughWalls, true)
    Ammount.setFlag(SpriteFlag.RelativeToCamera, true)
    Ammount.setPosition(21, 7)
    lives_ui = 4
    Ui1 = sprites.create(assets.image`Life icon`, SpriteKind.Ui)
    Ui1.setFlag(SpriteFlag.GhostThroughWalls, true)
    Ui1.setFlag(SpriteFlag.RelativeToCamera, true)
    Ui1.setPosition(9, 7)
    Lives = sprites.create(assets.image`Zero`, SpriteKind.Ui)
    Lives.setFlag(SpriteFlag.GhostThroughWalls, true)
    Lives.setFlag(SpriteFlag.RelativeToCamera, true)
    Lives.setPosition(27, 7)
    Health_ui = 8
    Health = sprites.create(assets.image`Health meter8`, SpriteKind.Ui)
    Health.setFlag(SpriteFlag.GhostThroughWalls, true)
    Health.setFlag(SpriteFlag.RelativeToCamera, true)
    Health.setFlag(SpriteFlag.Invisible, true)
    Health.setPosition(76, 16)
    Power_text = sprites.create(assets.image`Power text`, SpriteKind.Ui)
    Power_text.setFlag(SpriteFlag.GhostThroughWalls, true)
    Power_text.setFlag(SpriteFlag.RelativeToCamera, true)
    Power_text.setFlag(SpriteFlag.Invisible, true)
    Power_text.setPosition(76, 6)
    Star_ui = 0
    Star = sprites.create(assets.image`Star ui sprite`, SpriteKind.Ui)
    Star.setFlag(SpriteFlag.GhostThroughWalls, true)
    Star.setFlag(SpriteFlag.RelativeToCamera, true)
    Star.setPosition(129, 7)
    Ammount = sprites.create(assets.image`X`, SpriteKind.Ui)
    Ammount.setFlag(SpriteFlag.GhostThroughWalls, true)
    Ammount.setFlag(SpriteFlag.RelativeToCamera, true)
    Ammount.setPosition(140, 7)
    Stars = sprites.create(assets.image`Zero`, SpriteKind.Ui)
    Stars.setFlag(SpriteFlag.GhostThroughWalls, true)
    Stars.setFlag(SpriteFlag.RelativeToCamera, true)
    Stars.setPosition(147, 7)
    Coin_ui = 0
    Coin = sprites.create(assets.image`Coin ui sprite`, SpriteKind.Ui)
    Coin.setFlag(SpriteFlag.GhostThroughWalls, true)
    Coin.setFlag(SpriteFlag.RelativeToCamera, true)
    Coin.setPosition(129, 21)
    Ammount = sprites.create(assets.image`X`, SpriteKind.Ui)
    Ammount.setFlag(SpriteFlag.GhostThroughWalls, true)
    Ammount.setFlag(SpriteFlag.RelativeToCamera, true)
    Ammount.setPosition(140, 21)
    Coins = sprites.create(assets.image`Zero`, SpriteKind.Ui)
    Coins.setFlag(SpriteFlag.GhostThroughWalls, true)
    Coins.setFlag(SpriteFlag.RelativeToCamera, true)
    Coins.setPosition(147, 21)
    Coins_2 = sprites.create(assets.image`Zero`, SpriteKind.Ui)
    Coins_2.setFlag(SpriteFlag.GhostThroughWalls, true)
    Coins_2.setFlag(SpriteFlag.RelativeToCamera, true)
    Coins_2.setPosition(153, 21)
    Coins_2.setFlag(SpriteFlag.Invisible, true)
}
let BBB2: Sprite = null
let BBB: Sprite = null
let Door_er: Sprite = null
let Door_el: Sprite = null
let Coins_2: Sprite = null
let Coins: Sprite = null
let Coin: Sprite = null
let Stars: Sprite = null
let Star: Sprite = null
let Star_ui = 0
let Power_text: Sprite = null
let Health: Sprite = null
let Lives: Sprite = null
let Ui1: Sprite = null
let lives_ui = 0
let Ammount: Sprite = null
let WingBox: Sprite = null
let Red_bobomb: Sprite = null
let EnemyMoveNow1: Sprite = null
let Gomba: Sprite = null
let Gombaset = 0
let Coin_YI: Sprite = null
let Camera: Sprite = null
let Coin_ui = 0
let Health_ui = 0
let BP: Sprite = null
let BattleWarp: Sprite = null
let BBBE = false
let Gravity = false
let DoorStart = false
let Door_sr: Sprite = null
let Door_sl: Sprite = null
let Mario: Sprite = null
let Pipe: Sprite = null
let _2D = false
let Start = false
let MarioAnim: Sprite = null
let Cutscene = false
let hand: Sprite = null
let Mario_head: Sprite = null
let Press_start: Sprite = null
let First = false
let MOVE = false
MOVE = false
let ERROR97 = false
First = false
scene.setBackgroundImage(assets.image`Name screen`)
music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
pause(1500)
color.FadeToBlack.startScreenEffect()
pause(2500)
color.clearFadeEffect()
First = true
tiles.setCurrentTilemap(tilemap`Start screen`)
Press_start = sprites.create(assets.image`Press start`, SpriteKind.Start_sprites)
animation.runImageAnimation(
Press_start,
assets.animation`Press start anim`,
540,
true
)
Press_start.changeScale(1, ScaleAnchor.Middle)
tiles.placeOnTile(Press_start, tiles.getTileLocation(1, 6))
Mario_head = sprites.create(assets.image`Mario Head`, SpriteKind.Start_sprites)
animation.runImageAnimation(
Mario_head,
assets.animation`myAnim6`,
250,
true
)
Mario_head.changeScale(7, ScaleAnchor.Middle)
tiles.placeOnTile(Mario_head, tiles.getTileLocation(5, 3))
hand = sprites.create(assets.image`hand`, SpriteKind.Start_sprites)
hand.setStayInScreen(true)
controller.moveSprite(hand, 100, 100)
tiles.placeOnTile(hand, tiles.getTileLocation(1, 2))
game.onUpdate(function () {
    if (Start == true) {
        if (Cutscene == false) {
            MarioAnim.setPosition(Mario.x, Mario.y)
        }
    }
})
game.onUpdateInterval(1, function () {
    if (Health_ui == 0) {
        lives_ui += -1
        Health_ui = 8
    }
})
game.onUpdateInterval(1, function () {
    if (lives_ui == 0) {
        GAME_OVER()
    }
})
game.onUpdateInterval(1, function () {
    if (Start == true) {
        if (Cutscene == false) {
            if (lives_ui == 0) {
                Lives.setImage(assets.image`Zero`)
            } else if (lives_ui == 1) {
                Lives.setImage(assets.image`One`)
            } else if (lives_ui == 2) {
                Lives.setImage(assets.image`Two`)
            } else if (lives_ui == 3) {
                Lives.setImage(assets.image`Three`)
            } else if (lives_ui == 4) {
                Lives.setImage(assets.image`Four`)
            } else if (lives_ui == 5) {
                Lives.setImage(assets.image`Five`)
            } else if (lives_ui == 6) {
                Lives.setImage(assets.image`Six`)
            } else if (lives_ui == 7) {
                Lives.setImage(assets.image`Seven`)
            } else if (lives_ui == 8) {
                Lives.setImage(assets.image`Eight`)
            } else if (lives_ui == 9) {
                Lives.setImage(assets.image`Nine`)
            }
            if (Health_ui == 0) {
                Health.setFlag(SpriteFlag.Invisible, false)
                Power_text.setFlag(SpriteFlag.Invisible, false)
                Health.setImage(assets.image`Health meter0`)
            } else if (Health_ui == 1) {
                Health.setFlag(SpriteFlag.Invisible, false)
                Power_text.setFlag(SpriteFlag.Invisible, false)
                Health.setImage(assets.image`Health meter1`)
            } else if (Health_ui == 2) {
                Health.setFlag(SpriteFlag.Invisible, false)
                Power_text.setFlag(SpriteFlag.Invisible, false)
                Health.setImage(assets.image`Health meter2`)
            } else if (Health_ui == 3) {
                Health.setFlag(SpriteFlag.Invisible, false)
                Power_text.setFlag(SpriteFlag.Invisible, false)
                Health.setImage(assets.image`Health meter3`)
            } else if (Health_ui == 4) {
                Health.setFlag(SpriteFlag.Invisible, false)
                Power_text.setFlag(SpriteFlag.Invisible, false)
                Health.setImage(assets.image`Health meter4`)
            } else if (Health_ui == 5) {
                Health.setFlag(SpriteFlag.Invisible, false)
                Power_text.setFlag(SpriteFlag.Invisible, false)
                Health.setImage(assets.image`Health meter5`)
            } else if (Health_ui == 6) {
                Health.setFlag(SpriteFlag.Invisible, false)
                Power_text.setFlag(SpriteFlag.Invisible, false)
                Health.setImage(assets.image`Health meter6`)
            } else if (Health_ui == 7) {
                Health.setFlag(SpriteFlag.Invisible, false)
                Power_text.setFlag(SpriteFlag.Invisible, false)
                Health.setImage(assets.image`Health meter7`)
            } else if (Health_ui == 8) {
                Health.setImage(assets.image`Health meter8`)
                timer.after(600, function () {
                    Health.setVelocity(0, -74)
                    Power_text.setVelocity(0, -74)
                    timer.after(600, function () {
                        Health.setFlag(SpriteFlag.Invisible, true)
                        Power_text.setFlag(SpriteFlag.Invisible, true)
                        Health.setPosition(76, 16)
                        Power_text.setPosition(76, 6)
                    })
                })
            }
            if (Star_ui == 0) {
                Stars.setImage(assets.image`Zero`)
            } else if (Star_ui == 1) {
                Stars.setImage(assets.image`One`)
            } else if (Star_ui == 2) {
                Stars.setImage(assets.image`Two`)
            } else if (Star_ui == 3) {
                Stars.setImage(assets.image`Three`)
            } else if (Star_ui == 4) {
                Stars.setImage(assets.image`Four`)
            } else if (Star_ui == 5) {
                Stars.setImage(assets.image`Five`)
            } else if (Star_ui == 6) {
                Stars.setImage(assets.image`Six`)
            } else if (Star_ui == 7) {
                Stars.setImage(assets.image`Seven`)
            } else if (Star_ui == 8) {
                Stars.setImage(assets.image`Eight`)
            } else if (Star_ui == 9) {
                Stars.setImage(assets.image`Nine`)
            }
            if (Coin_ui == 0) {
                Coins.setImage(assets.image`Zero`)
            } else if (Coin_ui == 1) {
                Coins.setImage(assets.image`One`)
            } else if (Coin_ui == 2) {
                Coins.setImage(assets.image`Two`)
            } else if (Coin_ui == 3) {
                Coins.setImage(assets.image`Three`)
            } else if (Coin_ui == 4) {
                Coins.setImage(assets.image`Four`)
            } else if (Coin_ui == 5) {
                Coins.setImage(assets.image`Five`)
            } else if (Coin_ui == 6) {
                Coins.setImage(assets.image`Six`)
            } else if (Coin_ui == 7) {
                Coins.setImage(assets.image`Seven`)
            } else if (Coin_ui == 8) {
                Coins.setImage(assets.image`Eight`)
            } else if (Coin_ui == 9) {
                Coins.setImage(assets.image`Nine`)
            } else if (Coin_ui == 10) {
                Coins_2.setFlag(SpriteFlag.Invisible, false)
                Coins.setImage(assets.image`One`)
                Coins_2.setImage(assets.image`Zero`)
            } else if (Coin_ui == 11) {
                Coins.setImage(assets.image`One`)
                Coins_2.setImage(assets.image`One`)
            } else if (Coin_ui == 12) {
                Coins.setImage(assets.image`One`)
                Coins_2.setImage(assets.image`Two`)
            } else if (Coin_ui == 13) {
                Coins.setImage(assets.image`One`)
                Coins_2.setImage(assets.image`Three`)
            } else if (Coin_ui == 14) {
                Coins.setImage(assets.image`One`)
                Coins_2.setImage(assets.image`Four`)
            } else if (Coin_ui == 15) {
                Coins.setImage(assets.image`One`)
                Coins_2.setImage(assets.image`Five`)
            } else if (Coin_ui == 16) {
                Coins.setImage(assets.image`One`)
                Coins_2.setImage(assets.image`Six`)
            } else if (Coin_ui == 17) {
                Coins.setImage(assets.image`One`)
                Coins_2.setImage(assets.image`Seven`)
            } else if (Coin_ui == 18) {
                Coins.setImage(assets.image`One`)
                Coins_2.setImage(assets.image`Eight`)
            } else if (Coin_ui == 19) {
                Coins.setImage(assets.image`One`)
                Coins_2.setImage(assets.image`Nine`)
            } else if (Coin_ui == 20) {
                Coins.setImage(assets.image`Two`)
                Coins_2.setImage(assets.image`Zero`)
            } else if (Coin_ui == 21) {
                Coins.setImage(assets.image`Two`)
                Coins_2.setImage(assets.image`One`)
            } else if (Coin_ui == 22) {
                Coins.setImage(assets.image`Two`)
                Coins_2.setImage(assets.image`Two`)
            } else if (Coin_ui == 23) {
                Coins.setImage(assets.image`Two`)
                Coins_2.setImage(assets.image`Three`)
            } else if (Coin_ui == 24) {
                Coins.setImage(assets.image`Two`)
                Coins_2.setImage(assets.image`Four`)
            } else if (Coin_ui == 25) {
                Coins.setImage(assets.image`Two`)
                Coins_2.setImage(assets.image`Five`)
            } else if (Coin_ui == 26) {
                Coins.setImage(assets.image`Two`)
                Coins_2.setImage(assets.image`Six`)
            } else if (Coin_ui == 27) {
                Coins.setImage(assets.image`Two`)
                Coins_2.setImage(assets.image`Seven`)
            } else if (Coin_ui == 28) {
                Coins.setImage(assets.image`Two`)
                Coins_2.setImage(assets.image`Eight`)
            } else if (Coin_ui == 29) {
                Coins.setImage(assets.image`Two`)
                Coins_2.setImage(assets.image`Nine`)
            } else if (Coin_ui == 30) {
                Coins.setImage(assets.image`Three`)
                Coins_2.setImage(assets.image`Zero`)
            }
        }
    }
})
game.onUpdateInterval(2, function () {
    if (Cutscene == false) {
        if (_2D == true) {
            if (Mario.vy != 0) {
                for (let value of tiles.getTilesByType(assets.tile`Bridge0`)) {
                    if (Mario.bottom - 9 < value.y) {
                        tiles.setWallAt(value, true)
                    } else {
                        tiles.setWallAt(value, false)
                    }
                }
            }
            if (Mario.isHittingTile(CollisionDirection.Bottom)) {
                if (characterAnimations.matchesRule(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingUp))) {
                    if (Mario.vx != 100) {
                        characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving))
                    }
                    if (Mario.vx == 100) {
                        characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingRight))
                    }
                    if (Mario.vx == -100) {
                        characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft))
                    }
                }
                if (Mario.isHittingTile(CollisionDirection.Bottom)) {
                    if (characterAnimations.matchesRule(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingUp))) {
                        if (Mario.vx != -100) {
                            characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving))
                        }
                        if (Mario.vx == -100) {
                            characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft))
                        }
                        if (Mario.vx == 100) {
                            characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingRight))
                        }
                    }
                }
            }
            if (!(Mario.isHittingTile(CollisionDirection.Bottom))) {
                if (!(controller.A.isPressed())) {
                    if (characterAnimations.matchesRule(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingRight))) {
                        characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingUp))
                    }
                    if (characterAnimations.matchesRule(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft))) {
                        characterAnimations.setCharacterState(MarioAnim, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingUp))
                    }
                }
            }
        }
    }
})
game.onUpdateInterval(2, function () {
    if (Start == true) {
        if (Cutscene == false) {
            if (DoorStart == true) {
                if (Mario.overlapsWith(Door_sl)) {
                    tiles.setCurrentTilemap(tilemap`level0`)
                    for (let value of sprites.allOfKind(SpriteKind.COIN_Y)) {
                        animation.stopAnimation(animation.AnimationTypes.All, value)
                        value.setFlag(SpriteFlag.Invisible, true)
                        value.setImage(assets.image`invis`)
                    }
                    tiles.placeOnTile(Mario, tiles.getTileLocation(19, 39))
                    sprites.destroyAllSpritesOfKind(SpriteKind.Door)
                    Door_el = sprites.create(assets.image`D3`, SpriteKind.Door)
                    Door_el.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(Door_el, tiles.getTileLocation(19, 40))
                    Door_er = sprites.create(assets.image`D4`, SpriteKind.Door)
                    Door_er.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(Door_er, tiles.getTileLocation(20, 40))
                    BBB = sprites.create(assets.image`BBB`, SpriteKind.Door)
                    BBB.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(BBB, tiles.getTileLocation(11, 26))
                    DoorStart = false
                }
            }
        }
    }
})
game.onUpdateInterval(2, function () {
    if (Cutscene == false) {
        if (_2D == true) {
            if (Gravity == true) {
                Mario.setVelocity(0, 250)
            }
        }
    }
})
game.onUpdateInterval(2, function () {
    if (Start == true) {
        if (Cutscene == true) {
            if (DoorStart == false) {
                if (BBBE == true) {
                    if (Mario.overlapsWith(BP)) {
                        Bobomb_Battlefield()
                    }
                }
            }
        }
    }
})
game.onUpdateInterval(2, function () {
    if (Start == true) {
        if (Cutscene == false) {
            if (DoorStart == true) {
                if (Mario.overlapsWith(Door_sr)) {
                    tiles.setCurrentTilemap(tilemap`level0`)
                    for (let value of sprites.allOfKind(SpriteKind.COIN_Y)) {
                        animation.stopAnimation(animation.AnimationTypes.All, value)
                        value.setFlag(SpriteFlag.Invisible, true)
                        value.setImage(assets.image`invis`)
                    }
                    tiles.placeOnTile(Mario, tiles.getTileLocation(20, 39))
                    sprites.destroyAllSpritesOfKind(SpriteKind.Door)
                    Door_el = sprites.create(assets.image`D3`, SpriteKind.Door)
                    Door_el.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(Door_el, tiles.getTileLocation(19, 40))
                    Door_er = sprites.create(assets.image`D4`, SpriteKind.Door)
                    Door_er.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(Door_er, tiles.getTileLocation(20, 40))
                    BBB = sprites.create(assets.image`BBB`, SpriteKind.Door)
                    BBB.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(BBB, tiles.getTileLocation(11, 26))
                    DoorStart = false
                }
            }
        }
    }
})
game.onUpdateInterval(2, function () {
    if (Start == true) {
        if (Cutscene == false) {
            if (DoorStart == false) {
                if (Mario.overlapsWith(BBB)) {
                    tiles.setCurrentTilemap(tilemap`level9`)
                    tiles.placeOnTile(Mario, tiles.getTileLocation(14, 5))
                    sprites.destroyAllSpritesOfKind(SpriteKind.Door)
                    BBB2 = sprites.create(assets.image`BBB2`, SpriteKind.Door)
                    BBB2.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(BBB2, tiles.getTileLocation(15, 5))
                    BBBE = true
                    BattleWarp = sprites.create(assets.image`Battle warp`, SpriteKind.PaintWarp)
                    tiles.placeOnTile(BattleWarp, tiles.getTileLocation(2, 7))
                    BattleWarp.setFlag(SpriteFlag.Invisible, true)
                    BattleWarp = sprites.create(assets.image`Battle warp`, SpriteKind.PaintWarp)
                    BattleWarp.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(BattleWarp, tiles.getTileLocation(2, 8))
                    BP = sprites.create(assets.image`BP`, SpriteKind.PaintWarp)
                    BP.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(BP, tiles.getTileLocation(1, 7))
                }
            }
        }
    }
})
game.onUpdateInterval(2, function () {
    if (Start == true) {
        if (Cutscene == false) {
            if (DoorStart == false) {
                if (Mario.overlapsWith(Door_el)) {
                    tiles.setCurrentTilemap(tilemap`level13`)
                    for (let value of sprites.allOfKind(SpriteKind.COIN_Y)) {
                        value.setFlag(SpriteFlag.Invisible, false)
                        value.setImage(assets.image`Coin sprite`)
                        animation.runImageAnimation(
                        value,
                        assets.animation`myAnim1`,
                        50,
                        true
                        )
                    }
                    tiles.placeOnTile(Mario, tiles.getTileLocation(18, 15))
                    sprites.destroyAllSpritesOfKind(SpriteKind.Door)
                    Door_sl = sprites.create(assets.image`D1`, SpriteKind.Door)
                    Door_sl.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(Door_sl, tiles.getTileLocation(18, 14))
                    Door_sr = sprites.create(assets.image`D2`, SpriteKind.Door)
                    Door_sr.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(Door_sr, tiles.getTileLocation(19, 14))
                    DoorStart = true
                }
            }
        }
    }
})
game.onUpdateInterval(2, function () {
    if (Start == true) {
        if (Cutscene == false) {
            if (DoorStart == false) {
                if (BBBE == true) {
                    if (Mario.overlapsWith(BBB2)) {
                        BBBE = false
                        tiles.setCurrentTilemap(tilemap`level0`)
                        tiles.placeOnTile(Mario, tiles.getTileLocation(12, 26))
                        sprites.destroyAllSpritesOfKind(SpriteKind.Door)
                        sprites.destroyAllSpritesOfKind(SpriteKind.PaintWarp)
                        Door_el = sprites.create(assets.image`D3`, SpriteKind.Door)
                        Door_el.setFlag(SpriteFlag.Invisible, true)
                        tiles.placeOnTile(Door_el, tiles.getTileLocation(19, 40))
                        Door_er = sprites.create(assets.image`D4`, SpriteKind.Door)
                        Door_er.setFlag(SpriteFlag.Invisible, true)
                        tiles.placeOnTile(Door_er, tiles.getTileLocation(20, 40))
                        BBB = sprites.create(assets.image`BBB`, SpriteKind.Door)
                        BBB.setFlag(SpriteFlag.Invisible, true)
                        tiles.placeOnTile(BBB, tiles.getTileLocation(11, 26))
                    }
                }
            }
        }
    }
})
game.onUpdateInterval(2, function () {
    if (Start == true) {
        if (Cutscene == false) {
            if (DoorStart == false) {
                if (Mario.overlapsWith(Door_er)) {
                    tiles.setCurrentTilemap(tilemap`level13`)
                    for (let value of sprites.allOfKind(SpriteKind.COIN_Y)) {
                        value.setFlag(SpriteFlag.Invisible, false)
                        value.setImage(assets.image`Coin sprite`)
                        animation.runImageAnimation(
                        value,
                        assets.animation`myAnim1`,
                        50,
                        true
                        )
                    }
                    tiles.placeOnTile(Mario, tiles.getTileLocation(19, 15))
                    sprites.destroyAllSpritesOfKind(SpriteKind.Door)
                    Door_sl = sprites.create(assets.image`D1`, SpriteKind.Door)
                    Door_sl.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(Door_sl, tiles.getTileLocation(18, 14))
                    Door_sr = sprites.create(assets.image`D2`, SpriteKind.Door)
                    Door_sr.setFlag(SpriteFlag.Invisible, true)
                    tiles.placeOnTile(Door_sr, tiles.getTileLocation(19, 14))
                    DoorStart = true
                }
            }
        }
    }
})
game.onUpdateInterval(2, function () {
    if (_2D == true) {
        for (let value of sprites.allOfKind(SpriteKind.Gombaset1)) {
            if (value.isHittingTile(CollisionDirection.Left)) {
                value.setVelocity(30, 250)
            }
            if (value.isHittingTile(CollisionDirection.Right)) {
                value.setVelocity(-30, 250)
            }
        }
        if (Mario.overlapsWith(EnemyMoveNow1)) {
            if (Gombaset == 1) {
                for (let value of sprites.allOfKind(SpriteKind.Gombaset1)) {
                    value.setVelocity(-30, 250)
                    timer.after(100, function () {
                        for (let value of sprites.allOfKind(SpriteKind.Trigger1)) {
                            sprites.destroy(value)
                        }
                    })
                }
            }
        }
    }
})
