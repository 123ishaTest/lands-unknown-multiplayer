import {Requirement} from "common/tools/requirements/Requirement";
import {Skill} from "common/features/skills/Skill";

/**
 * A requirement which is completed when the required skill level is equalled
 */
export class SkillLevelRequirement extends Requirement {
    skill: Skill
    level: number;

    constructor(skill: Skill, level: number) {
        super();
        this.skill = skill;
        this.level = level;
    }

    get actualValue(): number {
        return this.skill.getLevel();
    }

    get hint(): string {
        return `Reach Lvl. ${this.level} ${this.skill.name}`;
    }

    get targetValue(): number {
        return this.level;
    }

}
