import type {SkillsSaveData} from "common/features/skills/SkillsSaveData";
import {SkillId} from "common/features/skills/SkillId";
import {IgtFeature} from "common/features/IgtFeature";
import {Skill} from "common/features/skills/Skill";

export class Skills extends IgtFeature {

    skills: Skill[];

    mining: Skill;
    woodCutting: Skill;
    fishing: Skill;
    smithing: Skill;
    cooking: Skill;

    constructor() {
        super('skills');
        this.mining = new Skill("Mining", SkillId.Mining);
        this.woodCutting = new Skill("Woodcutting", SkillId.Woodcutting);
        this.fishing = new Skill("Fishing", SkillId.Fishing);
        this.smithing = new Skill("Smithing", SkillId.Smithing);
        this.cooking = new Skill("Cooking", SkillId.Cooking);
        this.skills = [
            this.mining,
            this.woodCutting,
            this.fishing,
            this.smithing,
            this.cooking,
        ];
    }

    getSkill(id: SkillId) {
        return this.skills.find(skill => {
            return skill.id === id;
        })
    }

    gainExperience(id: SkillId, amount: number) {
        this.getSkill(id)?.gainExperience(amount);
    }

    load(data: SkillsSaveData): void {
        if (data.skills) {
            data.skills.forEach(savedSkill => {
                const skill = this.getSkill(savedSkill.id);
                if (skill) {
                    skill.exp = savedSkill.exp;
                }
            })
        }
    }

    save(): SkillsSaveData {
        const skills = this.skills.map(skill => {
            return {
                id: skill.id,
                exp: skill.exp,
            }
        });
        return {
            skills: skills
        }
    }
}
