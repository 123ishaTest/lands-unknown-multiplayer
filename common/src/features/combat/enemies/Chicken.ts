import {Enemy} from "common/features/combat/Enemy";
import {EnemyId} from "common/features/combat/EnemyId";
import {EnemyCategory} from "common/features/combat/EnemyCategory";
import {Attack} from "common/features/combat/Attack";
import {WeaponType} from "common/features/combat/WeaponType";

export class Chicken extends Enemy {

    constructor() {
        super(EnemyId.Chicken, [EnemyCategory.Birds], {
                maxHealth: 100,
                meleeAttack: 1,
                meleeDefense: 10,
            }, [
                new Attack("Peck", WeaponType.Melee, 6, 5, 10),
            ],
        );
    }

}
