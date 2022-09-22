import {SkillId} from "common/features/skills/SkillId";

export class Experience {
    skill: SkillId;
    exp: number;

    constructor(exp: number, skill: SkillId) {
        this.exp = exp;
        this.skill = skill;
    }
}
