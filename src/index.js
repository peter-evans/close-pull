const { inspect } = require("util");
const core = require("@actions/core");
const github = require("@actions/github");

function toBool(input, defaultVal) {
  if (typeof input === "boolean") {
    return input;
  } else if (typeof input === "undefined" || input.length == 0) {
    return defaultVal;
  } else {
    return input === "true";
  }
}

async function run() {
  try {
    const inputs = {
      token: core.getInput("token"),
      repository: core.getInput("repository"),
      pullRequestNumber: core.getInput("pull-request-number"),
      comment: core.getInput("comment"),
      deleteBranch: toBool(core.getInput("delete-branch"), false),
    };
    core.debug(`Inputs: ${inspect(inputs)}`);

    const repo = inputs.repository.split("/");
    core.debug(`Repo: ${inspect(repo)}`);

    const octokit = new github.GitHub(inputs.token);

    if (inputs.comment && inputs.comment.length > 0) {
      core.info("Adding a comment before closing the pull request");
      await octokit.pulls.createComment({
        owner: repo[0],
        repo: repo[1],
        pull_number: inputs.pullRequestNumber,
        body: inputs.comment,
      });
    }

    core.info("Closing the pull request");
    await octokit.pulls.update({
      owner: repo[0],
      repo: repo[1],
      pull_number: inputs.pullRequestNumber,
      state: "closed",
    });

    if (inputs.deleteBranch) {
      const { data: pull } = await octokit.pulls.get({
        owner: repo[0],
        repo: repo[1],
        pull_number: inputs.pullRequestNumber,
      });
      core.debug(`Pull: ${inspect(pull)}`);

      const ref = "heads/" + pull["head"]["ref"];
      core.debug(`Pull request head ref: ${ref}`);

      // Attempt to delete the ref. This will fail if
      // the pull request was raised from a fork.
      core.info("Attempting to delete the pull request branch");
      try {
        await octokit.git.deleteRef({
          owner: repo[0],
          repo: repo[1],
          ref,
        });
      } catch (error) {
        core.debug(inspect(error));
      }
    }
  } catch (error) {
    core.debug(inspect(error));
    core.setFailed(error.message);
  }
}

run();
