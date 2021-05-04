import * as TYPES from 'types';
import { Section } from '../models';
import { errorsHandler, sectionQuestionsInfo } from 'src/helpers';

const sections: { Query: TYPES.Query; Mutation: TYPES.Mutation } = {
  Query: {
    getSection: async (_, _id, context) => {
      try {
        errorsHandler.authentication(context);
        errorsHandler.authorization(context);
        let section;
        section = await Section.findById(_id, null, { lean: true });
        if (section?.name) {
          const questionsInfo = await sectionQuestionsInfo(section.name);
          section = { ...section, ...questionsInfo };
        }
        return section;
      } catch (err) {
        throw new Error(err);
      }
    },
    getSections: async (_, { args }, context) => {
      try {
        errorsHandler.authentication(context);
        errorsHandler.authorization(context);
        let sections;
        if (!args?.keyword) {
          sections = await Section.find({ ...args?.filter })
            .skip(args?.start)
            .limit(args?.limit)
            .sort({ isActive: -1 })
            .lean();
        } else {
          const query = args.keyword.toString();
          sections = await Section.find({
            name: { $regex: query, $options: 'i' },
          })
            .skip(args?.start)
            .limit(args?.limit)
            .sort({ isActive: -1 })
            .lean();
        }
        sections = <TYPES.Section[]>sections.map(async (_section) => {
          let questionsInfo;
          if (_section?.name) questionsInfo = await sectionQuestionsInfo(_section.name);
          const section = { ..._section, ...questionsInfo };
          return <TYPES.Section>section;
        });
        return sections;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    editSection: async (_, { inputs }, context) => {
      try {
        const { _id, ...changes } = inputs;
        errorsHandler.authentication(context);
        errorsHandler.authorization(context);
        const _section = await Section.findById(_id);
        errorsHandler.noItem('Section');
        if (_section) {
          await _section.updateOne(changes);
          const section = await Section.findById(_id, null, { lean: true });
          return section;
        }
        return null;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteSection: async (_, _id, context) => {
      try {
        errorsHandler.authentication(context);
        errorsHandler.authorization(context);
        const section = await Section.findById(_id, null, { lean: true });
        if (section?.isActive)
          throw new Error(`Delete Denied! Section "${section?.name}" is Active`);
        await Section.findByIdAndDelete(_id);
        return true;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default sections;
